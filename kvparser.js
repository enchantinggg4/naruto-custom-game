const fs = require("fs");


class Parser {


    constructor(code) {
        this.code = code.split("");
        this.parsed = {};
        this.index = 0;
        this.line = 0;
        this.stack = [];
    }


    poll() {
        return this.code[this.index++];
    }

    peek() {
        return this.code[this.index + 1];
    }

    lastStack() {
        return this.stack[this.stack.length - 1];
    }

    lastStackType() {
        return this.stack[this.stack.length - 1].type;
    }


    process(char) {
        const ignored = [
            "\t",
            "\n",
            "\r"
        ];
        if (ignored.includes(char)) {// noinspection UnnecessaryReturnStatementJS
            if (char === "\n")
                this.line++;
            return;
        } else if (char === ' ') {
            return this.onSpace();
        } else if (char === '"') {
            return this.onQuote(char);
        } else if (char === '{') {
            return this.onBlockStart(char);
        } else if (char === '}') {
            return this.onBlockEnd(char);
        } else if (char === '/') {
            return this.onComment();
        } else {
            return this.onChar(char);
        }
    }

    parse() {
        let item = this.poll();
        while (item) {
            this.process(item);
            item = this.poll();
        }
    }

    onComment() {
        if (!this.lastStack()) {
            this.stack.push({
                type: "COMMENT_START"
            })
        } else {
            const last = this.lastStack();
            if (last.type === "COMMENT_START") {
                this.stack.pop();
                let item = this.poll();
                while (item !== "\n") {
                    item = this.poll();
                }
            }

        }
    }

    onSpace() {
        if (!this.lastStack()) return;
        else if (this.lastStackType() === "CONTENT") {

            this.stack.push({
                type: "CONTENT",
                value: this.stack.pop().value + " "
            })
        } else {
            return;
        }
    }

    onChar(char) {
        if (!this.lastStack()) this.fail();
        else if (this.lastStackType() === "CONTENT") {

            this.stack.push({
                type: "CONTENT",
                value: this.stack.pop().value + char
            })
        } else {
            this.stack.push({
                type: "CONTENT",
                value: char
            })
        }

    }

    onBlockStart() {
        this.stack.push({
            type: "BLOCK_START"
        })
    }

    onBlockEnd() {
        let item = this.stack.pop();
        const items = [];
        while (item.type !== "BLOCK_START") {
            items.push(item);
            item = this.stack.pop();
        }
        const before = this.stack.pop();
        if (before.type !== "QUOTATION") {
            this.fail();
        } else {
            this.stack.push({
                type: "NAMED_BLOCK",
                value: {
                    name: before.value,
                    items
                }
            })
        }
    }

    onQuote() {
        if (!this.lastStack()) {
            // start
            this.stack.push({
                type: "QUOTATION_START"
            })
        } else if (this.lastStackType() === "CONTENT") {
            // replace with full type - { type: "QUOTATION", value: "1324" }
            const keyValue = this.stack.pop();
            // pop quote_start
            this.stack.pop();

            const full = {
                type: "QUOTATION",
                value: keyValue.value
            };

            const quote = this.stack[this.stack.length - 1]; // check last
            if (!quote) {
                this.stack.push(full);
            } else if (quote.type === "QUOTATION") {
                this.stack.pop(); // pop cuz we know what we doin
                this.stack.push({
                    type: "KEY_VALUE",
                    value: {
                        key: quote.value,
                        value: full.value
                    }
                })
            } else {
                this.stack.push(full)
            }
        } else {
            // its start.
            this.stack.push({
                type: "QUOTATION_START"
            })
        }
    }

    blockToJson(item, parent) {
        const b = {};
        item.value.items.forEach(it => {
            if (it.type === "NAMED_BLOCK") {
                this.blockToJson(it, b)
            } else if (it.type === "KEY_VALUE") {
                b[it.value.key] = it.value.value;
            } else {
                console.log(it, "IDK");
            }

        });

        parent[item.value.name] = b;
    }

    toJSON() {
        const json = {};
        this.blockToJson(this.stack[0], json);

        return json;
    }


    fail() {
        throw Error(`Error parsing at ${this.line}`)
    }
}


function jsonToKV(json, deep = 0) {

    const genTab = (d) => {
        const del = "\t";
        return new Array(d).fill(del).join("");
    };

    const lines = [];

    Object.keys(json).forEach(key => {
        if (typeof json[key] === "object") {
            lines.push(
                {v: `"${key}"`, i: 0},
                {v: `{`, i: 0},
                {v: jsonToKV(json[key], deep + 1), i: -1},
                {v: `}`, i: 0},
            );
        } else {
            lines.push({v: `"${key}"               "${json[key]}"`, i: 0});
        }
    });
    return lines.map(it => {
        return it.i === -1 ? it.v : `${genTab(deep)}${it.v}`
    }).join(`\n`);
}

function parseKVToJSON(file) {
    const code = fs.readFileSync(file, {encoding: "UTF-8"}).replace(/^\uFEFF/, '');
    const parser = new Parser(code);
    parser.parse();
    return parser.toJSON()
}

module.exports.parseKV = parseKVToJSON;
module.exports.jsonToKV = jsonToKV;
