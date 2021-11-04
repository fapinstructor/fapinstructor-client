import "@testing-library/jest-dom";
import "jest-styled-components";
import "@auth0/auth0-react";
import faker from "faker";
import mockDate from "mockdate";

import throwOnConsoleError from "@/test/throwOnConsoleError";

// Seed faker so it generates deterministic fake data
faker.seed(123);
// Mock the current date
mockDate.set("November 22, 2020 04:19:00");

global.fetch = require("jest-fetch-mock");
global.context = {};

jest.useFakeTimers("modern");

throwOnConsoleError();
