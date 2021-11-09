import * as yup from "yup";
import { AnySchema } from "yup";
import { AnyObject, Maybe, Optionals } from "yup/lib/types";
import Lazy from "yup/lib/Lazy";

import validateArrayValueUniqueness from "@/utils/validation/validateArrayValueUniqueness";
import dedupeArray from "@/utils/validation/dedupeArray";

yup.addMethod(yup.array, "unique", validateArrayValueUniqueness);
yup.addMethod(yup.array, "dedupe", dedupeArray);

declare module "yup" {
  interface ArraySchema<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends AnySchema | Lazy<any, any>,
    C extends AnyObject = AnyObject,
    TIn extends Maybe<yup.TypeOf<T>[]> = yup.TypeOf<T>[] | undefined,
    TOut extends Maybe<yup.Asserts<T>[]> = yup.Asserts<T>[] | Optionals<TIn>
    // eslint-disable-next-line import/namespace
  > extends yup.BaseSchema<TIn, C, TOut> {
    unique(): ArraySchema<T, C>;
    dedupe(): ArraySchema<T, C>;
  }
}
