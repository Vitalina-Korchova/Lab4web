// test/validation.test.ts
import { strict as assert } from "assert";
import { JSDOM } from "jsdom";
import { ValidationBook, ValidationUser } from "../src/validation";

// Налаштування JSDOM
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).document = window.document;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).window = window;

// Додаємо типи для HTMLFormElement
global.HTMLFormElement = window.HTMLFormElement;

describe("Validation Functions", () => {
  describe("ValidationBook", () => {
    it("should return false for invalid release year", () => {
      const formHtml = `
        <form class="needs-validation-book">
          <input type="text" class="input_release_year" value="2025" />
          <div class="invalid-feedback"></div>
        </form>
      `;
      document.body.innerHTML = formHtml;

      const isValid = ValidationBook();
      assert.equal(isValid, false, "Validation should fail for future years");
    });

    it("should return true for valid release year", () => {
      const formHtml = `
        <form class="needs-validation-book">
          <input type="text" class="input_release_year" value="${new Date().getFullYear()}" />
          <div class="invalid-feedback"></div>
        </form>
      `;
      document.body.innerHTML = formHtml;

      const isValid = ValidationBook();
      assert.equal(isValid, true, "Validation should succeed for current year");
    });
  });

  describe("ValidationUser", () => {
    it("should return false for invalid email", () => {
      const formHtml = `
        <form class="needs-validation-user">
          <input type="text" class="input_email" value="invalid-email" />
          <div class="invalid-feedback"></div>
        </form>
      `;
      document.body.innerHTML = formHtml;

      const isValid = ValidationUser();
      assert.equal(isValid, false, "Validation should fail for invalid email");
    });

    it("should return true for valid email", () => {
      const formHtml = `
        <form class="needs-validation-user">
          <input type="text" class="input_email" value="test@example.com" />
          <div class="invalid-feedback"></div>
        </form>
      `;
      document.body.innerHTML = formHtml;

      const isValid = ValidationUser();
      assert.equal(isValid, true, "Validation should succeed for valid email");
    });
  });
});
