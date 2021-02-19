"use strict";
class ThemeBController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }
}
module.exports = new ThemeBController();
