# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.3.1](https://github.com/iendeavor/vue-next-select/compare/v2.3.0...v2.3.1) (2021-05-04)


### Bug Fixes

* it should only fire removed event when there is one selected option ([3ebcfd6](https://github.com/iendeavor/vue-next-select/commit/3ebcfd67185f663251273c487fdc066567e11ffd))
* wrong use of teleport ([49b8775](https://github.com/iendeavor/vue-next-select/commit/49b877533c53d7ed6be0b1bacdb428f761156cd0)), closes [#180](https://github.com/iendeavor/vue-next-select/issues/180)

## [2.3.0](https://github.com/iendeavor/vue-next-select/compare/v2.2.0...v2.3.0) (2021-05-02)


### Features

* expose loading and toggle slot ([8e6aee1](https://github.com/iendeavor/vue-next-select/commit/8e6aee177eae0fab45f1ae6cbbc82f74847e8d01)), closes [#150](https://github.com/iendeavor/vue-next-select/issues/150)


### Bug Fixes

* style ([03de974](https://github.com/iendeavor/vue-next-select/commit/03de974b13dd9166485b43ada54eb66355c60ed8))
* wrong type validation ([a11f33e](https://github.com/iendeavor/vue-next-select/commit/a11f33ea498b9f9b38245cd22f73a7d150c56cee))

## [2.2.0](https://github.com/iendeavor/vue-next-select/compare/v2.1.1...v2.2.0) (2021-04-30)


### Features

* a11y ([bdf57c3](https://github.com/iendeavor/vue-next-select/commit/bdf57c3f67200d846411367e18999d7e25695ca1))


### Bug Fixes

* update:ModelValue event should be fired synchronously ([209489c](https://github.com/iendeavor/vue-next-select/commit/209489c26c3bfd6ff15c8b06c039a5392aa9e1ee))

### [2.1.1](https://github.com/iendeavor/vue-next-select/compare/v2.1.0...v2.1.1) (2021-04-03)


### Bug Fixes

* cursor should only be text when input appears ([efbad93](https://github.com/iendeavor/vue-next-select/commit/efbad93c51de451695a1b9a1512c265b8168230c)), closes [#157](https://github.com/iendeavor/vue-next-select/issues/157)
* ignore case by default ([0132082](https://github.com/iendeavor/vue-next-select/commit/01320829c994bd73a5a7a33bcdd98da056d877a4)), closes [#157](https://github.com/iendeavor/vue-next-select/issues/157)
* it should filter iff there is no visible-option ([3c46d53](https://github.com/iendeavor/vue-next-select/commit/3c46d537303741cf8168df7423909e318f3f4de4))
* tags should ignore groups ([f705477](https://github.com/iendeavor/vue-next-select/commit/f705477513a199696db24859ea3e9b9f451d3cd6))

## [2.1.0](https://github.com/iendeavor/vue-next-select/compare/v2.0.1...v2.1.0) (2021-03-30)


### Features

* group ([7fe7a37](https://github.com/iendeavor/vue-next-select/commit/7fe7a37daf76962c94d4bd63d810864faf3e11c3)), closes [#103](https://github.com/iendeavor/vue-next-select/issues/103)

### [2.0.1](https://github.com/iendeavor/vue-next-select/compare/v2.0.0...v2.0.1) (2021-03-27)


### Bug Fixes

* highlight closest option if original is unavailable ([34a277a](https://github.com/iendeavor/vue-next-select/commit/34a277ab40ce705f5c8e0ba15e3d799285fe4ea0))
* no syntax downgrade ([5b71bb4](https://github.com/iendeavor/vue-next-select/commit/5b71bb4a9b49b316005b3418f00b24636b5b8dc4))

## [2.0.0](https://github.com/iendeavor/vue-next-select/compare/v1.3.6...v2.0.0) (2021-03-27)


### ⚠ BREAKING CHANGES

* remove tracky-by prop

### Features

* remove trackBy due to conflicted to valueBy ([8ee3375](https://github.com/iendeavor/vue-next-select/commit/8ee33757272a9839f57e2665982bd93d5cb94bf4))

### [1.3.6](https://github.com/iendeavor/vue-next-select/compare/v1.3.5...v1.3.6) (2021-03-24)


### Bug Fixes

* it should scroll to highlighted option ([f91b05b](https://github.com/iendeavor/vue-next-select/commit/f91b05bb222031b6d1d523a47379256f864245a5))
* remove small blank padding on corner ([6f7eba9](https://github.com/iendeavor/vue-next-select/commit/6f7eba9e3efc9d4155e1575982820790c2ef777b))

### [1.3.5](https://github.com/iendeavor/vue-next-select/compare/v1.3.4...v1.3.5) (2021-03-22)


### Bug Fixes

* mousemove should be triggered on custom template ([ba0530d](https://github.com/iendeavor/vue-next-select/commit/ba0530d7f8271c1e724574995c9761b1957fd980))

### [1.3.4](https://github.com/iendeavor/vue-next-select/compare/v1.3.3...v1.3.4) (2021-03-21)


### Bug Fixes

* add min-height for empty label ([faa7d90](https://github.com/iendeavor/vue-next-select/commit/faa7d9066600cf9c73ca2c34612cc6a9845abd18)), closes [#125](https://github.com/iendeavor/vue-next-select/issues/125)

### [1.3.3](https://github.com/iendeavor/vue-next-select/compare/v1.3.2...v1.3.3) (2021-03-20)

### [1.3.2](https://github.com/iendeavor/vue-next-select/compare/v1.3.1...v1.3.2) (2021-03-20)


### Bug Fixes

* it should not select on non-selectable option ([3dcf8cf](https://github.com/iendeavor/vue-next-select/commit/3dcf8cfeea4002de52a36145cd98762545671378))

### [1.3.1](https://github.com/iendeavor/vue-next-select/compare/v1.3.0...v1.3.1) (2021-03-19)


### Bug Fixes

* some highlight bugs ([3f67b69](https://github.com/iendeavor/vue-next-select/commit/3f67b6951b9651735653360ebe20e937e3a10a74))

## [1.3.0](https://github.com/iendeavor/vue-next-select/compare/v1.2.1...v1.3.0) (2021-03-18)


### Features

* filter options by label by default ([6ebd509](https://github.com/iendeavor/vue-next-select/commit/6ebd50923c5251cc7f3538fcd4aa21786e3425c7))
* implement disabled option ([a456bc2](https://github.com/iendeavor/vue-next-select/commit/a456bc207147575d71573628c37a7db7c066aaa5))
* select with highlight item ([a50dccf](https://github.com/iendeavor/vue-next-select/commit/a50dccf48a38d899ac49df73d7f480c84440671b))

### [1.2.1](https://github.com/iendeavor/vue-next-select/compare/v1.2.0...v1.2.1) (2021-03-09)


### Bug Fixes

* label may be a number ([#111](https://github.com/iendeavor/vue-next-select/issues/111)) ([0cf41d2](https://github.com/iendeavor/vue-next-select/commit/0cf41d22033b3eaefa91fbe74b07a6ffc96ce6b8))

## [1.2.0](https://github.com/iendeavor/vue-next-select/compare/v1.1.0...v1.2.0) (2021-03-07)


### Features

* expose version ([7f47f61](https://github.com/iendeavor/vue-next-select/commit/7f47f61c52c221751cfca08c359e8e621c0bcff9))

## [1.1.0](https://github.com/iendeavor/vue-next-select/compare/v1.0.2...v1.1.0) (2021-03-07)


### Features

* implement clear-on-close prop ([755af4a](https://github.com/iendeavor/vue-next-select/commit/755af4ab38a3f1b3aa2bd69cd5a788cad365c825))
* show not allow cursor when it cannot add or remove ([6e4f32c](https://github.com/iendeavor/vue-next-select/commit/6e4f32c1ff46f374fd4254d90f942aefebeb4838))


### Bug Fixes

* input should change color when disabled ([44929c1](https://github.com/iendeavor/vue-next-select/commit/44929c160066a59fde1e02a9488f36d0c718a32c))
* input should display not allow cursor when disabled ([ab3f361](https://github.com/iendeavor/vue-next-select/commit/ab3f36150987b26fc8d75992587b58f39fbad2a2))

### [1.0.2](https://github.com/iendeavor/vue-next-select/compare/v1.0.1...v1.0.2) (2021-03-03)

## [1.0.0](https://github.com/iendeavor/vue-next-select/compare/v0.2.0...v1.0.0) (2021-02-10)


### Features

* expose empty-model-value ([23880f6](https://github.com/iendeavor/vue-next-select/commit/23880f60a886f7688dbb81cb27e5e2a72e912b24))
