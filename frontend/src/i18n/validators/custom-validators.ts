import type { ValidationRuleWithoutParams } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

const { regex } = helpers;

/**
 *  custom hasLowercase validator
 */
const lowercaseRegex = /[a-z]/;
const hasLowercase$1 = regex(lowercaseRegex);

export const hasLowercase: ValidationRuleWithoutParams = {
    $validator: hasLowercase$1,
    $message: 'At least one lowercase',
};

/**
 * custom hasUppercase validator
 */
const uppercaseRegex = /[A-Z]/;
const hasUppercase$1 = regex(uppercaseRegex);

export const hasUppercase: ValidationRuleWithoutParams = {
    $validator: hasUppercase$1,
    $message: 'At least one uppercase',
};

/**
 * custom hasNumeric validator
 */
const numericRegex = /[0-9]/;
const hasNumeric$1 = regex(numericRegex);

export const hasNumeric: ValidationRuleWithoutParams = {
    $validator: hasNumeric$1,
    $message: 'At least one numeric',
};
