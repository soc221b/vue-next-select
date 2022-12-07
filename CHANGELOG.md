# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 2.10.5 (2022-12-07)

### [2.10.4](https://github.com/iendeavor/vue-next-select/compare/v2.10.3...v2.10.4) (2022-03-25)

### [2.10.3](https://github.com/iendeavor/vue-next-select/compare/v2.10.2...v2.10.3) (2022-03-17)


### Bug Fixes

* ref may be called after destroyed ([3869b6b](https://github.com/iendeavor/vue-next-select/commit/3869b6b89eca02c623587cc68fbc41ea68292280)), closes [#414](https://github.com/iendeavor/vue-next-select/issues/414)

### [2.10.2](https://github.com/iendeavor/vue-next-select/compare/v2.10.1...v2.10.2) (2021-11-17)


### Bug Fixes

* if not specified, fallback to non-group options ([45d1afd](https://github.com/iendeavor/vue-next-select/commit/45d1afd9b4b9eec162ddffcb2220b641535a61f3)), closes [#347](https://github.com/iendeavor/vue-next-select/issues/347)

### [2.10.1](https://github.com/iendeavor/vue-next-select/compare/v2.10.0...v2.10.1) (2021-08-31)


### Bug Fixes

* minimum vue version required is 3.2 ([4547660](https://github.com/iendeavor/vue-next-select/commit/4547660922e6d8af831b949544abb24e2f21f8fa))
* wrong type ([845de29](https://github.com/iendeavor/vue-next-select/commit/845de292f68fbf8db00a71cb40a5e6367bf5bc80)), closes [#291](https://github.com/iendeavor/vue-next-select/issues/291)

## [2.10.0](https://github.com/iendeavor/vue-next-select/compare/v2.9.0...v2.10.0) (2021-08-31)


### Features

* typescript ([e74b791](https://github.com/iendeavor/vue-next-select/commit/e74b79123e75600f62699cb9d9047852cdf6e826)), closes [#291](https://github.com/iendeavor/vue-next-select/issues/291)

## [2.9.0](https://github.com/iendeavor/vue-next-select/compare/v2.8.0...v2.9.0) (2021-08-05)


### Features

* add autocomplete field support ([#266](https://github.com/iendeavor/vue-next-select/issues/266)) ([d4793be](https://github.com/iendeavor/vue-next-select/commit/d4793be573841a6be65b96f23e5a2dd32dd1c02c))
* add label slot ([#270](https://github.com/iendeavor/vue-next-select/issues/270)) ([c9d57c3](https://github.com/iendeavor/vue-next-select/commit/c9d57c35b32922df9f258c4733471e98f2ac81f0))

## [2.8.0](https://github.com/iendeavor/vue-next-select/compare/v2.7.1...v2.8.0) (2021-07-25)


### Features

* allow to pass attrs ([b4a3815](https://github.com/iendeavor/vue-next-select/commit/b4a3815fd3064b3fc827764b167326702162fb35))

### [2.7.1](https://github.com/iendeavor/vue-next-select/compare/v2.7.0...v2.7.1) (2021-07-13)

### Bug Fixes

* add prevent modifier when hitting "enter" in dropdown ([a792696](https://github.com/iendeavor/vue-next-select/commit/a7926966db321cf91a9fecce90fa82a9e5fc824a))

## [2.7.0](https://github.com/iendeavor/vue-next-select/compare/v2.6.0...v2.7.0) (2021-06-29)


### Features

* expose remove function for tag slot ([77f8f72](https://github.com/iendeavor/vue-next-select/commit/77f8f720ad9eba137be385de3b06338720bc6823)), closes [#235](https://github.com/iendeavor/vue-next-select/issues/235)


### Bug Fixes

* prevent blur when click on children ([58ab2bf](https://github.com/iendeavor/vue-next-select/commit/58ab2bf63bc9be0565d86635330fae571f361652))

## [2.6.0](https://github.com/iendeavor/vue-next-select/compare/v2.5.0...v2.6.0) (2021-06-12)


### Features

* a11y ([596b1b6](https://github.com/iendeavor/vue-next-select/commit/596b1b6c45450702ae04e4dae227fa2210743d25))
* add a11y-disabled ([dc3d7c1](https://github.com/iendeavor/vue-next-select/commit/dc3d7c1d775189f58c54d9a9d8a6375225bc02af))
* expose toggle event ([9cb3579](https://github.com/iendeavor/vue-next-select/commit/9cb3579f87343a736779890e594302ffe30b6b8a))
* home/end kbd interaction ([30eaa9d](https://github.com/iendeavor/vue-next-select/commit/30eaa9d34b27622ba3d1da1a909c5ade7f4c4dc6))
* type-ahead kbd interaction ([36ba77a](https://github.com/iendeavor/vue-next-select/commit/36ba77a45b03dc86d4d7527d433c6af23e8bdabf))


### Bug Fixes

* add aria-disabled, aris-busy to listbox ([25d51b4](https://github.com/iendeavor/vue-next-select/commit/25d51b46820f43735b08dc296d8394b52499c1bd))
* aria-selected indicates that option is selected ([e1e0705](https://github.com/iendeavor/vue-next-select/commit/e1e070534261c814fa8a35513d2020de2e864600))
* exact matching keydown ([96cdb07](https://github.com/iendeavor/vue-next-select/commit/96cdb070059c91963debe5ff4be74e9721e15dc6))
* wrong cursor ([d341614](https://github.com/iendeavor/vue-next-select/commit/d34161416f7bf2ef31c7e6d3f489779c75536351))

## [2.5.0](https://github.com/iendeavor/vue-next-select/compare/v2.4.3...v2.5.0) (2021-06-05)


### Features

* expose maxHeight prop ([5e9bf83](https://github.com/iendeavor/vue-next-select/commit/5e9bf836a714cfbfefe50ffb60a27452ed5229d7))
* expose openDirection prop ([7aebd6b](https://github.com/iendeavor/vue-next-select/commit/7aebd6bc0aa527443e14e8a04670d42e80cec772)), closes [#183](https://github.com/iendeavor/vue-next-select/issues/183)


### Bug Fixes

* the dropdown should only automaticlly scroll to selected option after open ([73e7794](https://github.com/iendeavor/vue-next-select/commit/73e7794e4f235a9d8f3c23a2c79625cc53fce342)), closes [#206](https://github.com/iendeavor/vue-next-select/issues/206)

### [2.4.4](https://github.com/iendeavor/vue-next-select/compare/v2.4.3...v2.4.4) (2021-06-05)


### Bug Fixes

* the dropdown should only automaticlly scroll to selected option after open ([ab91ac9](https://github.com/iendeavor/vue-next-select/commit/ab91ac9835124ae1abbd242f9ac0f5256ed3b57e)), closes [#206](https://github.com/iendeavor/vue-next-select/issues/206)

### [2.4.3](https://github.com/iendeavor/vue-next-select/compare/v2.4.2...v2.4.3) (2021-06-04)


### Bug Fixes

* the dropdown should automaticlly scroll to selected option ([f3b3b7d](https://github.com/iendeavor/vue-next-select/commit/f3b3b7dedcbbc00a664b3d628f259b28edc7dc6d)), closes [#206](https://github.com/iendeavor/vue-next-select/issues/206)

### [2.4.2](https://github.com/iendeavor/vue-next-select/compare/v2.4.1...v2.4.2) (2021-06-04)


### Bug Fixes

* computed options prop not works ([75c8864](https://github.com/iendeavor/vue-next-select/commit/75c886418796a60196a34e6638ae06977051705d)), closes [#207](https://github.com/iendeavor/vue-next-select/issues/207)

### [2.4.1](https://github.com/iendeavor/vue-next-select/compare/v2.4.0...v2.4.1) (2021-05-30)


### Bug Fixes

* escape searching string ([4e84b90](https://github.com/iendeavor/vue-next-select/commit/4e84b902fcc93276b47fb612a4b9791e716e72a4))

## [2.4.0](https://github.com/iendeavor/vue-next-select/compare/v2.3.1...v2.4.0) (2021-05-19)


### Features

* emit consistent event name focus and blur ([5c9ad44](https://github.com/iendeavor/vue-next-select/commit/5c9ad4459b3ef5bab9df2e0bd64a63328561f767))


### Bug Fixes

* prevent infinite loop ([69b3ff0](https://github.com/iendeavor/vue-next-select/commit/69b3ff0df9a3208d97feca0590d7e2289c685aca)), closes [#168](https://github.com/iendeavor/vue-next-select/issues/168)

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
