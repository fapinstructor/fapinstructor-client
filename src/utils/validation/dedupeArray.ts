import { AnySchema } from "yup";

export default function dedupeArray<T extends AnySchema>(this: T) {
  return this.transform(function (value, originalValue: string[]) {
    if (this.isType(value) && value !== null) {
      return Array.from(
        new Set(originalValue.filter((v) => v).map((v) => v.toLowerCase()))
      );
    }
    return value;
  });
}
