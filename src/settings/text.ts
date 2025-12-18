/* eslint-disable @typescript-eslint/no-non-null-assertion -- s*/
import { type TextSettings, getCookie, setCookie } from "../menu";

export const textTemplate = `
<template id="devindex-text">
    <span><!-- title --></span>
    <p><!-- description --></p>
    <br />
    <input type="text"></input>
</template>
`;

export function createTextElement(setting: TextSettings): DocumentFragment {
    const template: HTMLTemplateElement =
        document.querySelector("#devindex-text")!;
    const clone = document.importNode(template.content, true);

    const title = clone.querySelector("span")!;
    const description = clone.querySelector("p")!;
    const input = clone.querySelector("input")!;

    input.name = setting.key;
    input.value = getCookie(input.name) ?? "";

    input.oninput = function () {
        setCookie(input.name, input.value, 30);
    };

    title.textContent = setting.title;

    if (setting.description) {
        description.textContent = setting.description;
    } else {
        description.remove();
    }

    return clone;
}
