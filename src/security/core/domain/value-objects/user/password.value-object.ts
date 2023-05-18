import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';
import crypto from 'node:crypto';

const FIELD_NAME = 'password';
const HASH_ALGORITHM = 'sha512';
const PASSWORD_REGEX = new RegExp(
  /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
);

export class PasswordValueObject extends ValueObjectAbstract<string> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: string) {
    super(value);
    this.schema = Joi.object({
      value: Joi.string()
        .required()
        .min(8)
        .pattern(PASSWORD_REGEX)
        .messages({
          'string.base': `El ${FIELD_NAME} del usuario debe ser de tipo texto`,
          'string.empty': `El ${FIELD_NAME} del usuario no puede estar vacío`,
          'string.min': `El ${FIELD_NAME} del usuario debe tener una longitud mínima de {#limit}`,
          'string.pattern.match': `El ${FIELD_NAME} del usuario debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial`,
          'any.required': `El ${FIELD_NAME} del usuario es requerido`,
        }),
    });
  }

  validateData(): void {
    if (this.schema) {
      const { error } = this.schema.validate({ value: this._value });
      if (error) this.setError({ field: FIELD_NAME, message: error.message });
    }
  }

  valueOf(): string {
    const value = super.valueOf();
    return crypto.createHash(HASH_ALGORITHM).update(value).digest('hex');
  }
}
