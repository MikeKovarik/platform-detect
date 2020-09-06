# Changelog

## [Unreleased]

## [3.0.1]

### Fixed

- Incorrectl identification of safari and samsung browser

## [3.0.0]

### Breaking changes
- changed behavior of `platform.edge`. It was previously `true` only for desktop Windows version of the old Edge based on EdgeHtml rendering engine. Android and iOs versions of Edge showed `platform.edge:false`. Since MS is ditching EdgeHtml in favor of Chromium from desktop version, we reflect the change now and all Edge browsers on any OS now return `platform.edge:true`. You can still detect the old edge by querying the rendering engine `platform.edgeHtml`.
- behavior of all other browsers likely slightly changed too due to fixes in detection of edge, firefox, opera. Therefore `platform.safari` & `platform.chrome` should show less false positives.
- `platform.dev` is now `undefined` in browsers because Chrome removed the way we could use to detect Dev Tools.
- `platform.formfactor` now includes `hybrid` which is a touch device with a mouse - like Surface Pro (tablet with detachable keyboard) or Surface laptop (laptop with touchscreen)

### Fixed
- Firefox on Android no longer shows `platform.gecko:true`. Instead it is `platform.blink:true`.
- `platform.firefox` is now detected by both `Firefox/` and `FxiOS/`.
- `platform.opera` is now detected by both `Opera/` and `OPR/`.
- `platform.edge` Is now true in all versions of Edge on any OS.
- `platform.safari` now has less false positives due to improvements in detecting other browsers.
- `platform.gecko` now returns true on android since Firefox now compiles Gecko for their Android Firefox.
- `platform.opera` is no longer falsely detected (for example on tizen's browser or instad of Samsung Browser)
- `platform.gamepar` in older chromium browsers

### Added
- `platform.samsungBrowser`
- `platform.formfactor` now reflects into `platform.phone`, `platform.tablet`, `platform.desktop`, etc...

### Removed
- `platform.chromeapp`

## [2.0.0]

### Changed
- modularized - broken down single file into multiple independent files that can be imported as needed.

## [1.0.0]

### Added
- initial implementation

[Unreleased]: https://github.com/MikeKovarik/exifr/compare/3.0.1...HEAD
[3.0.1]: https://github.com/MikeKovarik/exifr/compare/v3.0.0...3.0.1
[3.0.0]: https://github.com/MikeKovarik/exifr/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/MikeKovarik/exifr/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/MikeKovarik/exifr/releases/tag/v1.0.0