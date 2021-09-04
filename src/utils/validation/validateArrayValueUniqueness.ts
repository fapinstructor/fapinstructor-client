import { AnySchema } from "yup";

export default function validateArrayValueUniqueness<T extends AnySchema>(
  this: T
) {
  return this.test("unique", "values must be unique", function (list = []) {
    return list.length === new Set(list).size;
  });
}
