import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'password';
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export class PasswordValueObject extends ValueObjectAbstract<string> {
  private schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  validateData(): void {
    if (!this.schema)
      this.schema = Joi.object({
        value: Joi.string()
          .pattern(new RegExp(PASSWORD_REGEX))
          .required()
          .messages({
            'string.base': `El ${FIELD_NAME} del usuario debe ser de tipo texto`,
            'string.empty': `El ${FIELD_NAME} del usuario no puede estar vacío`,
            'string.pattern.base': `El ${FIELD_NAME} del usuario debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial`,
            'any.required': `El ${FIELD_NAME} del usuario es requerido`,
          }),
      });
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
