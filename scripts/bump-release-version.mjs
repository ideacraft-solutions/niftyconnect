import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname( fileURLToPath( import.meta.url ) );
const pluginDir = path.resolve( scriptDir, '..' );
const pluginSlug = path.basename( pluginDir );
const mainFile = path.join( pluginDir, `${ pluginSlug }.php` );
const readmeFile = path.join( pluginDir, 'readme.txt' );
const packageFile = path.join( pluginDir, 'package.json' );
const lockFile = path.join( pluginDir, 'package-lock.json' );
const potFile = path.join( pluginDir, 'languages', `${ pluginSlug }.pot` );
const releaseVersion = ( process.argv[ 2 ] || '' ).trim();

if ( ! releaseVersion ) {
	throw new Error( 'Usage: npm run release:bump -- <version>' );
}

if ( releaseVersion.startsWith( 'v' ) ) {
	throw new Error(
		`Use a plain WordPress.org version like ${ releaseVersion.slice( 1 ) }, not ${ releaseVersion }.`
	);
}

if ( ! /^\d+(?:\.\d+){1,3}(?:[-+][0-9A-Za-z.-]+)?$/.test( releaseVersion ) ) {
	throw new Error( `Release version "${ releaseVersion }" is not a valid WordPress.org version.` );
}

const readText = ( file ) => readFileSync( file, 'utf8' );

const replaceRequired = ( label, content, pattern, replacement ) => {
	let replacements = 0;
	const updated = content.replace( pattern, ( ...matches ) => {
		replacements += 1;
		return replacement( ...matches );
	} );

	if ( replacements !== 1 ) {
		throw new Error( `Expected exactly one ${ label}; found ${ replacements }.` );
	}

	return updated;
};

const mainFileContents = readText( mainFile );
const readmeContents = readText( readmeFile );
const potContents = readText( potFile );
const packageJson = JSON.parse( readText( packageFile ) );
const packageLock = JSON.parse( readText( lockFile ) );

if ( ! packageLock.packages?.[ '' ] ) {
	throw new Error( 'Could not find the root package entry in package-lock.json.' );
}

const updatedMainFile = replaceRequired(
	'plugin header Version in niftyconnect.php',
	mainFileContents,
	/^(\s*\*\s*Version:\s*)[^\r\n]+/m,
	( _match, prefix ) => `${ prefix }${ releaseVersion }`
);

const updatedMainFileAndConstant = replaceRequired(
	'NIFTYCONNECT_VERSION in niftyconnect.php',
	updatedMainFile,
	/(define\(\s*'NIFTYCONNECT_VERSION'\s*,\s*')[^']+('\s*\);)/,
	( _match, prefix, suffix ) => `${ prefix }${ releaseVersion }${ suffix }`
);

const updatedReadme = replaceRequired(
	'Stable tag in readme.txt',
	readmeContents,
	/^(Stable tag:\s*)[^\r\n]+/im,
	( _match, prefix ) => `${ prefix }${ releaseVersion }`
);

const updatedPot = replaceRequired(
	'Project-Id-Version in the translation template',
	potContents,
	/^("Project-Id-Version:.*\s)[^\s"]+(\\n")$/m,
	( _match, prefix, suffix ) => `${ prefix }${ releaseVersion }${ suffix }`
);

packageJson.version = releaseVersion;
packageLock.version = releaseVersion;
packageLock.packages[ '' ].version = releaseVersion;

const updates = [
	[ mainFile, updatedMainFileAndConstant ],
	[ readmeFile, updatedReadme ],
	[ packageFile, `${ JSON.stringify( packageJson, null, 2 ) }\n` ],
	[ lockFile, `${ JSON.stringify( packageLock, null, 2 ) }\n` ],
	[ potFile, updatedPot ],
];

const changedFiles = [];

for ( const [ file, contents ] of updates ) {
	if ( readText( file ) === contents ) {
		continue;
	}

	writeFileSync( file, contents );
	changedFiles.push( path.relative( pluginDir, file ) );
}

if ( changedFiles.length > 0 ) {
	console.log( `Updated release version to ${ releaseVersion } in:` );
	for ( const file of changedFiles ) {
		console.log( `- ${ file }` );
	}
} else {
	console.log( `Release metadata is already at ${ releaseVersion }.` );
}

const prepareResult = spawnSync(
	process.execPath,
	[ path.join( scriptDir, 'prepare-wporg-release.mjs' ), releaseVersion ],
	{
		cwd: pluginDir,
		stdio: 'inherit',
	}
);

if ( prepareResult.error ) {
	throw prepareResult.error;
}

if ( prepareResult.status !== 0 ) {
	process.exit( prepareResult.status ?? 1 );
}

const changelogHeading = `= ${ releaseVersion } =`;
const hasChangelog = updatedReadme
	.split( /\r?\n/ )
	.some( ( line ) => line.trim() === changelogHeading );

if ( ! hasChangelog ) {
	console.warn( `Add release notes under a "= ${ releaseVersion } =" heading in readme.txt before tagging.` );
}

console.log( `Release version ${ releaseVersion } is synchronized and validated.` );
