import * as yup from "yup";
import validateArrayValueUniqueness from "utils/validation/validateArrayValueUniqueness";

yup.addMethod(yup.array, "unique", validateArrayValueUniqueness);
