import * as yup from "yup";
import validateArrayValueUniqueness from "utils/validation/validateArrayValueUniqueness";
import { AnyObject, Maybe, Optionals } from "yup/lib/types";
import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";

yup.addMethod(yup.array, "unique", validateArrayValueUniqueness);

declare module "yup" {
  interface ArraySchema<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends AnySchema | Lazy<any, any>,
    C extends AnyObject = AnyObject,
    TIn extends Maybe<yup.TypeOf<T>[]> = yup.TypeOf<T>[] | undefined,
    TOut extends Maybe<yup.Asserts<T>[]> = yup.Asserts<T>[] | Optionals<TIn>
  > extends yup.BaseSchema<TIn, C, TOut> {
    unique(): ArraySchema<T, C>;
  }
}
