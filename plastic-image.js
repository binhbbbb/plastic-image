import '../@polymer/polymer/polymer-element.js';
import '../@polymer/iron-image/iron-image.js';
import { timeOut, idlePeriod } from '../@polymer/polymer/lib/utils/async.js';
import { beforeNextRender } from '../@polymer/polymer/lib/utils/render-status.js';
/**
 * `plastic-image`
 * iron-image wrapper supporting srcset
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
/**
@license MIT
*/
/**
`plastic-image` is a Polymer 2.0 element which adds extra plasticity to \<iron-image\> with support for srcset
and lazy loading.

`plastic-image` extends `iron-image` by adding a `srcset` attribute for client side image
size selection and `lazy-load` for loading the image only when it has scrolled into the 
viewport.

Please review the documentation for `iron-image` as it applies to this element  also.

plastic-image srcset 

The `srcset` attribute is a string consisting of one or more image selection strings separated by commas. 
Each image selection string is composed of:

1. A url to an image
2. One or _more_ descriptors
  - width descriptor: a positive integer directly followed by 'w'. e.g. `700w`
  - height descriptor: a positive integer directly followed by 'h'. e.g. `345h`
  - pixel density descriptor: a positive floating point number directly followed by 'x'. e.g. `2.0x`

`plastic-image` extends the `<img srcset="...">` feature by allowing multiple descriptors for an image
and mixed descriptors in a single srcset.

`plastic-image` also extends srcset use by optionally allowing image selection to be based on the render size of
the `plastic-image` control instead of the viewport, which is the standard.  To use this optional function 
include the `use-element-dim` attribute.

Example srcset

srcset="foo-s.jpg 150w, foo-sh.jpg 150w 2.0x, foo-m.jpg 405w, foo-mh 2.0x 405w, foo-l 1024w, foo-t 500w 750h"

Automatic Density

If _none_ of the image selection strings includes a pixel density descriptor ('x' e.g. `4.0x`), then the image
selection process will automatically compensate for the viewport's pixel density.

Examples:
Use the control as you would an `iron-image` but with the srcset.

<plastic-image preload fade sizing="contain"
  srcset="images/foo-s.jpg 150w, images/foo-sh.jpg 150w 2.0x, images/foo-m.jpg 405w, 
  images/foo-mh 2.0x 405w, images/foo-l 1024w, images/foo-t 500w 750h"
  placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAmElEQVQImWNmYGBgSExMzBATE7dSVFT8eO/evTcMDAwMjIFe5iYSIjybL136cunNW56FulIaEoJcfBdY5GWjvJ4/+SJhIcUhwavI5SbIxR+YvzRqH8unx7/Osf8VYpAVEWLgZuO8ljrfbwMDAwMD07u/j/ZYun5f9JfjSfGnHx9dGaCAJcBimwXjZ4Z+HllGn0XbXr+ASQAAi5UxQq88/fsAAAAASUVORK5CYII="></plastic-image>

To base image selection on the rendered size of the control add the `use-element-dim` attribute.

<plastic-image preload fade sizing="contain" use-element-dim
  srcset="images/foo-s.jpg 150w, images/foo-sh.jpg 150w 2.0x, images/foo-m.jpg 405w, 
  images/foo-mh 2.0x 405w, images/foo-l 1024w, images/foo-t 500w 750h"
  placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAmElEQVQImWNmYGBgSExMzBATE7dSVFT8eO/evTcMDAwMjIFe5iYSIjybL136cunNW56FulIaEoJcfBdY5GWjvJ4/+SJhIcUhwavI5SbIxR+YvzRqH8unx7/Osf8VYpAVEWLgZuO8ljrfbwMDAwMD07u/j/ZYun5f9JfjSfGnHx9dGaCAJcBimwXjZ4Z+HllGn0XbXr+ASQAAi5UxQq88/fsAAAAASUVORK5CYII="></plastic-image>

To automatically compensate for pixel density do not supply _any_ pixel density descriptors in the srcset.

<plastic-image preload fade sizing="contain" use-element-dim
  srcset="images/foo-s.jpg 150w, images/foo-sh.jpg 300w, images/foo-m.jpg 405w, 
  images/foo-mh 810w, images/foo-l 1024w, images/foo-t 500w 750h"
  placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAmElEQVQImWNmYGBgSExMzBATE7dSVFT8eO/evTcMDAwMjIFe5iYSIjybL136cunNW56FulIaEoJcfBdY5GWjvJ4/+SJhIcUhwavI5SbIxR+YvzRqH8unx7/Osf8VYpAVEWLgZuO8ljrfbwMDAwMD07u/j/ZYun5f9JfjSfGnHx9dGaCAJcBimwXjZ4Z+HllGn0XbXr+ASQAAi5UxQq88/fsAAAAASUVORK5CYII="></plastic-image>

Lazy Loading

Add the attribute `lazy-load` to the element and image loading will be delayed until the element
is in the viewport.

<plastic-image lazy-load preload fade sizing="contain" 
  srcset="images/foo-s.jpg 150w, images/foo-sh.jpg 150w 2.0x, images/foo-m.jpg 405w, 
  images/foo-mh 2.0x 405w, images/foo-l 1024w, images/foo-t 500w 750h"
  placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAmElEQVQImWNmYGBgSExMzBATE7dSVFT8eO/evTcMDAwMjIFe5iYSIjybL136cunNW56FulIaEoJcfBdY5GWjvJ4/+SJhIcUhwavI5SbIxR+YvzRqH8unx7/Osf8VYpAVEWLgZuO8ljrfbwMDAwMD07u/j/ZYun5f9JfjSfGnHx9dGaCAJcBimwXjZ4Z+HllGn0XbXr+ASQAAi5UxQq88/fsAAAAASUVORK5CYII="></plastic-image>

Standard iron-image properties that should not be used

Do not use `preventLoad` / `prevent-load`.  This is used internally by `plastic-image` to allow the srcset processing step.
To achieve that function use `delayLoad` / `delay-load` instead.

Do not use `src`.  That will be overwritten by the srcset evaluation.  To specify a fallback image use
the `fallbackSrc` / `fallback-src` attribute instead.


@element plastic-image
@demo demo/index.html
*/
class PlasticImage extends customElements.get('iron-image') {
    static get is() {
        return 'plastic-image';
    }
    // clone the iron-image template for issue 14 - no idea why this works
    static get template() {
        if (!window.PlasticImageTemplate) {
            window.PlasticImageTemplate = customElements.get('iron-image').template.cloneNode(true);
        }
        return window.PlasticImageTemplate;
    }
    static get importMeta() { return import.meta; }

    static get properties() {
        return {
            /**
             * a srcset string providing rules for
             * which image to select
             */
            srcset: {
                type: String
            },

            /**
             * The image url selected from srcset rules
             */
            _selectedImgUrl: {
                type: String,
                notify: true
            },
            /**
             * While true, the control refrains from
             * evaluating the srcset. Set in the markup
             * as delay-load and when you are ready set
             * the property value to false.
             *
             * For example you may be retrieving the srcset
             * from an ajax call. You would set this to true
             * in the markup and set it to false once the data
             * is available.
             */
            delayLoad: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            /**
             * When true, the dimensions of this control
             * are used instead of the viewport size to
             * make the image selection from the srcset expression.
             */
            useElementDim: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },
            /**
             * This is not really needed as long as there
             * is at least 1 image selection spec in the
             * srcset.  However, specifying this value
             * makes explicit an alternative that has no
             * dimensional or density spec.
             */
            fallbackSrc: {
                type: String,
                reflectToAttribute: true
            },
            /**
             * Indicates if the image should only be loaded
             * when it is scrolled into view
             */
            lazyLoad: {
                type: Boolean,
                value: false
            },
            _lazyLoadPending: {
                type: Boolean,
                value: true
            },
            /**
             * indicates that the browser supports webp images
             * @private
             */
            _browserSupportsWebp: {
                type: Boolean,
                value: false
            },
            /**
             * regex test for .webp extension
             * @protected
             */
            _webpRegex: {
                type: RegExp,
                value: /.+\.webp$/i
            },
            /**
             * override default webp detection regex
             */
            webpRegex: {
                type: String,
                observer: "_webpRegexObserver"
            },
            /**
             * Indicates that the srcset string has at least one webp image
             * @private
             */
            _hasWebp: {
                type: Boolean,
                value: false
            }
        };
    }

    static get observers() {
        return [
            '_doImageSelectionObserver(fallbackSrc, srcset, delayLoad, _lazyLoadPending, _webpRegex)',
            '_cleanupWillChange(fade, loaded, src)'
        ]
    }

    /**
     * At connection, prevent iron-image from loading the image.
     * When attached, parse the srcset string and pick
     * the best image
     * @private
     */
    connectedCallback() {
        super.connectedCallback();
        this.preventLoad = true;

        //Because we're fading, hint the browser that this property
        //will change and thus placing it on a separate GPU layer.
        if (this.fade) {
            this.$.placeholder.style.willChange = 'opacity'
        }

        // if lazy loading, set up the intersection
        // observer. Otherwise, go ahead and process
        // the image selection
        if (this.lazyLoad) {
            this._initLazyLoad();
        } else {
            this._lazyLoadPending = false;

            if (!this.delayLoad) {
                this.assignImgSrc();
            }
        }
    }

    /**
     * When disconnected, remove the intersectionObserver
     * if lazy loading is in effect.
     * @private
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.lazyLoad && this._lazyLoadPending && window.plasticImageIntersectionObserver) {
            window.plasticImageIntersectionObserver.observer.unobserve(this);
            // Firefox is frequently calling disconnectedCallback twice
            // per element.  So basically this counter is useless,
            // but on the bright side, it's no longer needed.
            if (window.plasticImageIntersectionObserver.counter > 0) {
                window.plasticImageIntersectionObserver.counter--;
            }
        }
    }

    /**
     * Observer for determining if it is time for
     * the control to set the src property in the
     * underlying iron-image.
     * @private
     */
    _doImageSelectionObserver(fallbackSrc, srcset, delayLoad, lazyLoadPending) {
        if (!delayLoad && !lazyLoadPending) {
            this.assignImgSrc();
        }
    }

    /**
     * By removing the will-change property the image can go off the separate layer (freeing up memory).
     */
    _cleanupWillChange(fade, loaded, src) {
        if (!fade || !loaded || !src) {
            //Nothing to clean up (yet)
            return;
        }

        //Execute no sooner than the animation has finished
        //and let the browser its self determine the right moment.
        timeOut.run(_ => idlePeriod.run(_ => {
            this.$.placeholder.style.willChange = ''
        }), 500);
    }

    /**
     * Assign the best image to the iron-image src property
     * and allow it to be loaded
     * @private
     */
    assignImgSrc() {
        let srcArray = this.srcset && this.srcset.length > 1 ? this.srcsetParse(this.srcset) : [];
        this._hasWebp = srcArray.filter((srcitem) => {
            return this._webpRegex.test(srcitem.url);
        }).length > 0;

        // webp filtering promise
        this._checkBrowserWebpSupport(srcArray)
            .then((arr) => {
                // Since we might need dimensions, schedule this
                // right before the render of the frame so that
                // clientWidth and clientHeight are available.
                beforeNextRender(this, () => {
                    this._selectedImgUrl = srcArray.length > 0 ? this.bestMatchingImage(arr) :
                        this.fallbackSrc;

                    if (!this.src || this.src !== this._selectedImgUrl) {
                        this.src = this._selectedImgUrl;
                    }

                    this.preventLoad = false;
                });
            });
    }

    /**
     * Returns a sorted array of only the unique elements of an array
     * @param arr {array} object array
     * @private
     */
    deepUnique(arr) {
        return arr.sort().filter((el, i) => JSON.stringify(el) !== JSON.stringify(arr[i - 1]));
    }

    /**
     * Srcset Parser
     *
     * By Alex Bell |  MIT License | https://github.com/albell/parse-srcset
     *
     * JS Parser for the string value that appears in markup <img srcset="here">
     *
     * @returns Array [{url: _, density: _, width: _, height:_}, ...]
     *
     * Based super duper closely on the reference algorithm at:
     * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
     *
     * Most comments are copied in directly from the spec
     * (except for comments in parens).
     */
    srcsetParse(input) {
        // UTILITY FUNCTIONS

        // Manual is faster than RegEx
        // http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
        // http://jsperf.com/whitespace-character/5
        function isSpace(c) {
            return (c === "\u0020" || // space
                c === "\u0009" || // horizontal tab
                c === "\u000A" || // new line
                c === "\u000C" || // form feed
                c === "\u000D"); // carriage return
        }

        function collectCharacters(regEx) {
            var chars,
                match = regEx.exec(input.substring(pos));
            if (match) {
                chars = match[0];
                pos += chars.length;
                return chars;
            }
        }

        var inputLength = input.length,

            // (Don't use \s, to avoid matching non-breaking space)
            regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
            regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
            regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
            regexTrailingCommas = /[,]+$/,
            regexNonNegativeInteger = /^\d+$/,

            // ( Positive or negative or unsigned integers or decimals, without or without exponents.
            // Must include at least one digit.
            // According to spec tests any decimal point must be followed by a digit.
            // No leading plus sign is allowed.)
            // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
            regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,

            url,
            descriptors,
            currentDescriptor,
            state,
            c,

            // 2. Let position be a pointer into input, initially pointing at the start
            //    of the string.
            pos = 0,

            // 3. Let candidates be an initially empty source set.
            candidates = [];

        // 4. Splitting loop: Collect a sequence of characters that are space
        //    characters or U+002C COMMA characters. If any U+002C COMMA characters
        //    were collected, that is a parse error.
        while (true) {
            collectCharacters(regexLeadingCommasOrSpaces);

            // 5. If position is past the end of input, return candidates and abort these steps.
            if (pos >= inputLength) {
                return candidates; // (we're done, this is the sole return path)
            }

            // 6. Collect a sequence of characters that are not space characters,
            //    and let that be url.
            url = collectCharacters(regexLeadingNotSpaces);

            // 7. Let descriptors be a new empty list.
            descriptors = [];

            // 8. If url ends with a U+002C COMMA character (,), follow these substeps:
            //		(1). Remove all trailing U+002C COMMA characters from url. If this removed
            //         more than one character, that is a parse error.
            if (url.slice(-1) === ",") {
                url = url.replace(regexTrailingCommas, "");
                // (Jump ahead to step 9 to skip tokenization and just push the candidate).
                parseDescriptors();

                //	Otherwise, follow these substeps:
            } else {
                tokenize();
            } // (close else of step 8)

            // 16. Return to the step labeled splitting loop.
        } // (Close of big while loop.)

        /**
         * Tokenizes descriptor properties prior to parsing
         * Returns undefined.
         */
        function tokenize() {

            // 8.1. Descriptor tokeniser: Skip whitespace
            collectCharacters(regexLeadingSpaces);

            // 8.2. Let current descriptor be the empty string.
            currentDescriptor = "";

            // 8.3. Let state be in descriptor.
            state = "in descriptor";

            while (true) {

                // 8.4. Let c be the character at position.
                c = input.charAt(pos);

                //  Do the following depending on the value of state.
                //  For the purpose of this step, "EOF" is a special character representing
                //  that position is past the end of input.

                // In descriptor
                if (state === "in descriptor") {
                    // Do the following, depending on the value of c:

                    // Space character
                    // If current descriptor is not empty, append current descriptor to
                    // descriptors and let current descriptor be the empty string.
                    // Set state to after descriptor.
                    if (isSpace(c)) {
                        if (currentDescriptor) {
                            descriptors.push(currentDescriptor);
                            currentDescriptor = "";
                            state = "after descriptor";
                        }

                        // U+002C COMMA (,)
                        // Advance position to the next character in input. If current descriptor
                        // is not empty, append current descriptor to descriptors. Jump to the step
                        // labeled descriptor parser.
                    } else if (c === ",") {
                        pos += 1;
                        if (currentDescriptor) {
                            descriptors.push(currentDescriptor);
                        }
                        parseDescriptors();
                        return;

                        // U+0028 LEFT PARENTHESIS (()
                        // Append c to current descriptor. Set state to in parens.
                    } else if (c === "\u0028") {
                        currentDescriptor = currentDescriptor + c;
                        state = "in parens";

                        // EOF
                        // If current descriptor is not empty, append current descriptor to
                        // descriptors. Jump to the step labeled descriptor parser.
                    } else if (c === "") {
                        if (currentDescriptor) {
                            descriptors.push(currentDescriptor);
                        }
                        parseDescriptors();
                        return;

                        // Anything else
                        // Append c to current descriptor.
                    } else {
                        currentDescriptor = currentDescriptor + c;
                    }
                    // (end "in descriptor"

                    // In parens
                } else if (state === "in parens") {

                    // U+0029 RIGHT PARENTHESIS ())
                    // Append c to current descriptor. Set state to in descriptor.
                    if (c === ")") {
                        currentDescriptor = currentDescriptor + c;
                        state = "in descriptor";

                        // EOF
                        // Append current descriptor to descriptors. Jump to the step labeled
                        // descriptor parser.
                    } else if (c === "") {
                        descriptors.push(currentDescriptor);
                        parseDescriptors();
                        return;

                        // Anything else
                        // Append c to current descriptor.
                    } else {
                        currentDescriptor = currentDescriptor + c;
                    }

                    // After descriptor
                } else if (state === "after descriptor") {

                    // Do the following, depending on the value of c:
                    // Space character: Stay in this state.
                    if (isSpace(c)) {

                        // EOF: Jump to the step labeled descriptor parser.
                    } else if (c === "") {
                        parseDescriptors();
                        return;

                        // Anything else
                        // Set state to in descriptor. Set position to the previous character in input.
                    } else {
                        state = "in descriptor";
                        pos -= 1;

                    }
                }

                // Advance position to the next character in input.
                pos += 1;

                // Repeat this step.
            } // (close while true loop)
        }

        /**
         * Adds descriptor properties to a candidate, pushes to the candidates array
         * @return undefined
         */
        // Declared outside of the while loop so that it's only created once.
        function parseDescriptors() {

            // 9. Descriptor parser: Let error be no.
            var pError = false,

                // 10. Let width be absent.
                // 11. Let density be absent.
                // 12. Let future-compat-h be absent. (We're implementing it now as h)
                w, d, h, i,
                candidate = {},
                desc, lastChar, value, intVal, floatVal;

            // 13. For each descriptor in descriptors, run the appropriate set of steps
            // from the following list:
            for (i = 0; i < descriptors.length; i++) {
                desc = descriptors[i];

                lastChar = desc[desc.length - 1];
                value = desc.substring(0, desc.length - 1);
                intVal = parseInt(value, 10);
                floatVal = parseFloat(value);

                // If the descriptor consists of a valid non-negative integer followed by
                // a U+0077 LATIN SMALL LETTER W character
                if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

                    // plastic-map-info issue 34 - density is allowed with width
                    // If width and density are not both absent, then let error be yes.
                    // if (w || d) {
                    if (w) {
                        pError = true;
                    }

                    // Apply the rules for parsing non-negative integers to the descriptor.
                    // If the result is zero, let error be yes.
                    // Otherwise, let width be the result.
                    if (intVal === 0) {
                        pError = true;
                    } else {
                        w = intVal;
                    }

                    // If the descriptor consists of a valid floating-point number followed by
                    // a U+0078 LATIN SMALL LETTER X character
                } else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

                    // plastic-map-info issue 34 - density is allowed with width and or height
                    // If width, density and future-compat-h are not all absent, then let error
                    // be yes.
                    // if (w || d || h) {
                    if (d) {
                        pError = true;
                    }

                    // Apply the rules for parsing floating-point number values to the descriptor.
                    // If the result is less than zero, let error be yes. Otherwise, let density
                    // be the result.
                    if (floatVal < 0) {
                        pError = true;
                    } else {
                        d = floatVal;
                    }

                    // If the descriptor consists of a valid non-negative integer followed by
                    // a U+0068 LATIN SMALL LETTER H character
                } else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

                    // plastic-map-info issue 34 - density is allowed with height
                    // If height and density are not both absent, then let error be yes.
                    // if (h || d) {
                    if (h) {
                        pError = true;
                    }

                    // Apply the rules for parsing non-negative integers to the descriptor.
                    // If the result is zero, let error be yes. Otherwise, let future-compat-h
                    // be the result.
                    if (intVal === 0) {
                        pError = true;
                    } else {
                        h = intVal;
                    }

                    // Anything else, Let error be yes.
                } else {
                    pError = true;
                }
            } // (close step 13 for loop)

            // 15. If error is still no, then append a new image source to candidates whose
            // URL is url, associated with a width width if not absent and a pixel
            // density density if not absent. Otherwise, there is a parse error.
            if (!pError) {
                candidate.url = url;
                if (w) {
                    candidate.width = w;
                }
                if (d) {
                    candidate.density = d;
                }
                if (h) {
                    candidate.height = h;
                }
                candidates.push(candidate);
            } else if (console && console.log) {
                console.log("Invalid srcset descriptor found in '" +
                    input + "' at '" + desc + "'.");
            }
        } // (close parseDescriptors fn)
    }

    /**
     * Converts a srcset array to a srcset string
     * @param arr {Array<Isrcset>} srcset array
     */
    srcsetStringify(arr) {
        return arr.map((el) => {
            if (!el.url) {
                throw new Error('URL is required.');
            }

            let ret = [el.url];

            if (el.width) {
                ret.push(el.width + 'w');
            }

            if (el.height) {
                ret.push(el.height + 'h');
            }

            if (el.density) {
                ret.push(el.density + 'x');
            }

            return ret.join(' ');
        }).join(', ');
    }

    /**
     * Get best image from srcset
     * @param arr {Array<Isrcset>} srcset array
     * @private
     */
    bestMatchingImage(arr) {
        let densityMultiplier = 1;

        // Check if denisty is provided in srcset
        let hasDensity = false;
        arr.forEach((src) => {
            if ("density" in src) {
                hasDensity = true;
            }
        });

        if (!hasDensity) {
            // When no density is set use devicePixelRatio as a multiplier for reference dimensions
            densityMultiplier = (window.devicePixelRatio || 1.0);
        }

        // reference dimensions
        let refDim = this.useElementDim ? {
            width: (this.clientWidth || window.innerWidth || document.documentElement.clientWidth) *
                densityMultiplier,
            height: (this.clientHeight || window.innerHeight || document.documentElement.clientHeight) *
                densityMultiplier,
            // When no density is provided densityMultiplier is used and density filter can be set to 1, otherwise use devicePixelRatio
            density: !hasDensity ? 1 : (window.devicePixelRatio || 1.0)
        } : {
            width: (window.innerWidth || document.documentElement.clientWidth) * densityMultiplier,
            height: (window.innerHeight || document.documentElement.clientHeight) *
                densityMultiplier,
            // When no density is provided densityMultiplier is used and density filter can be set to 1, otherwise use devicePixelRatio
            density: !hasDensity ? 1 : (window.devicePixelRatio || 1.0)
        };
        let filtered = this.fallbackSrc ? arr.concat([{
            url: this.fallbackSrc
        }]) : arr;
        filtered = this.filterLarge(
            this.filterLarge(
                this.filterLarge(filtered, 'width', refDim.width), 'height', refDim.height),
            'density', refDim.density);
        filtered = this.filterSmall(this.filterSmall(this.filterSmall(filtered, 'width'), 'height'),
            'density');

        return filtered[0].url;
    }

    /**
     * filter out disqualified items less than the refVal
     * @private
     */
    filterLarge(arr, attr, refVal) {
        if (arr.length < 2) return arr;
        let largest = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][attr]) {
                if (!largest || largest[attr] < arr[i][attr]) {
                    largest = arr[i];
                }
            }
        }
        if (!largest) return arr;

        let filtered = [];
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i][attr] || arr[i][attr] >= refVal) filtered.push(arr[i]);
        }
        if (filtered.length == 0) filtered.push(largest);

        return filtered;
    }
    /**
     * filter to the smallest items of a dimension
     * @private
     */
    filterSmall(arr, attr) {
        if (arr.length < 2) return arr;
        let smallest = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][attr]) {
                if (!smallest || smallest[attr] > arr[i][attr]) {
                    smallest = arr[i];
                }
            }
        }
        if (!smallest) return arr;

        let filtered = [];
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i][attr] || arr[i][attr] <= smallest[attr]) filtered.push(arr[i]);
        }

        return filtered;
    }

    /**
     * initialize lazy loading process by
     * creating an intersection observer and
     * adding this element to the observation
     * list.
     *
     * Waits for the polyfill to load, if necessary
     *
     * All instances of plastic-image share the same
     * IntersectionObserver.
     * @param {Boolean} polyfilled - is this being called after polyfill loaded
     * @private
     */
    _initLazyLoad(polyfilled = false) {
        // if the polyfill is needed and not yet loaded,
        // wait for it to load first.
        if (!('IntersectionObserver' in window)) {
            // There could be multiple plastic-image elements in the document
            // but we only need to load the polyfill for IntersectionObserver
            // one time.
            let polyfillScript = document.getElementById('polyfill-IntersectionObserver');
            if (!polyfillScript) {
                // load the intersection-observer polyfill script
                polyfillScript = document.createElement("script");
                polyfillScript.id = 'polyfill-IntersectionObserver';
                // The current version, 0.3.0, supports Safari which now has
                // native shadow DOM.  The version currently served by polyfill.io
                // does not support native shadow dom.
                //
                // Until the polyfill is updated to 0.3.0 or greater on polyfill.io
                // we will use version 0.3.0 and include it with the element.
                //
                // polyfillScript.src =
                //    "https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver";
                //
                polyfillScript.src = this.importPath + "intersection-observer.js";
                polyfillScript.async = true;
                document.head.appendChild(polyfillScript);
            }
            // listen for the polyfill to finish loading
            // then retry the initLazyLoad process
            polyfillScript.addEventListener("load", _ => this._initLazyLoad(true));
        } else {
            // IntersectionObserver is available, initialize observation
            // Create the observer for this page if it doesn't exist
            if (!window.plasticImageIntersectionObserver) {
                window.plasticImageIntersectionObserver = {
                    /* the number of elements sharing this observer */
                    counter: 0,
                    /* an IntersectionObserver with only default arguments */
                    observer: new IntersectionObserver((entries, observer) => {
                        entries.forEach((entry) => {
                            entry.target._lazyLoadCallback(entry);
                        });
                    }, {})
                };
                if (polyfilled) {
                    // issue 23 - Edge does not reliably dispatch scroll events
                    // issue 36 - Safari iOS does not reliably get scroll events with iron-scroll-target
                    //            At this point all pollyfilled browsers need polling :(
                    window.plasticImageIntersectionObserver.observer.POLL_INTERVAL = 120;
                }
            }
            // observe this element
            window.plasticImageIntersectionObserver.observer.observe(this);
            window.plasticImageIntersectionObserver.counter++;
        }
    }

    /**
     * called by the intersection observer
     * to indicate a change in intersection
     * @private
     */
    _lazyLoadCallback(e) {
        // if we are intersecting, set _lazyLoadPending false to allow the image to load
        // and stop observing intersections for this element
        if (this._lazyLoadPending && (e.isIntersecting || e.intersectionRatio >= 0.001)) {
            this._lazyLoadPending = false;
            if (window.plasticImageIntersectionObserver && window.plasticImageIntersectionObserver.observer) {
                window.plasticImageIntersectionObserver.observer.unobserve(this);
                if (window.plasticImageIntersectionObserver.counter > 0) {
                    window.plasticImageIntersectionObserver.counter--;
                }
            }
        }
    }

    /**
     * Checks if the srcset has a webp image, and if so if the
     * browser supports webp. Returns a filtered copy of the srcset
     * array depending on support. Saves the detection so that other
     * instances of plastic image do not have to perform the feature
     * test.
     *
     * @param srcArray {source set array}
     * @return promise of filtered source set array
     * @private
     */
    _checkBrowserWebpSupport(srcArray) {
        return new Promise((resolve, reject) => {
            // if there are no webp images in the srcArray, we do not need to detect support
            if (!this._hasWebp) {
                resolve(srcArray);
            } else {
                // if webp has previously been detected, use the prior detection
                if (window.plasticImageWebp) {
                    this._supportsWebp = window.plasticImageWebp.supports;
                    resolve(this._filterWebp(srcArray, window.plasticImageWebp.supports));
                } else {
                    // support has not been previously detected so
                    // do a new test for webp support
                    let webpImg = new Image();
                    webpImg.onload = () => {
                        let result = (webpImg.width > 0) && (webpImg.height > 0);
                        window.plasticImageWebp = {
                            supports: result
                        };
                        // not used by element, but used by WCT tests
                        this._supportsWebp = result;
                        resolve(this._filterWebp(srcArray, result));
                    };
                    webpImg.onerror = () => {
                        window.plasticImageWebp = {
                            supports: false
                        };
                        // not used by element, but used by WCT tests
                        this._supportsWebp = false;
                        resolve(this._filterWebp(srcArray, false));
                    }
                    webpImg.src =
                        "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
                }
            }
        });
    }

    /**
     * Returns a filtered copy of the source set array
     * including only webp images if supports is true,
     * or only non webp images if supports is false.
     *
     * @param srcArray {source set array}
     * @param supports {boolean} indicates if the browser supports webp
     * @returns filtered source set array
     * @private
     */
    _filterWebp(srcArray, supports) {
        return srcArray.filter((srcitem) => {
            return this._webpRegex.test(srcitem.url) === supports;
        })
    }
    /**
     * Observer for this.webpRegex which provides the element consumer
     * api access to modify the webp detection regex. This function
     * handle a change to webpRegex
     * by applying the change to _webpRegex
     */
    _webpRegexObserver(n, o) {
        if (n) {
            // webpRegex can be either a matching string, e.g.
            // "\.webp\?foo=bar" or it can be a full regex expression, e.g.
            // "/\.webp\?foo=bar/i" i.e. with the enclosing "/" and modifiers, if any.
            let regParts = n.match(/^\/(.*?)\/([gim]*)$/);
            if (regParts) {
                this._webpRegex = new RegExp(regParts[1], regParts[2]);
            } else {
                // if the string did not have delimiters
                // create a regex with just the pattern and ignore case
                this._webpRegex = new RegExp(n, "i");
            }
        } else {
            // reset to default webp detection
            this._webpRegex = /.+\.webp$/i;
        }
    }
}

window.customElements.define(PlasticImage.is, PlasticImage);
