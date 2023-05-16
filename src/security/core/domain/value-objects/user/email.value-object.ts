import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'email';

export class EmailValueObject extends ValueObjectAbstract<string> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: string) {
    super(value);
    this.schema = Joi.object({
      value: Joi.string()
        .required()
        .email()
        .messages({
          'string.base': `El ${FIELD_NAME} del usuario debe ser de tipo texto`,
          'string.empty': `El ${FIELD_NAME} del usuario no puede estar vacío`,
          'string.email': `El ${FIELD_NAME} del usuario debe ser un correo válido`,
          'any.required': `El ${FIELD_NAME} del usuario es requerido`,
        }),
    });
  }

  validateData(): void {
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
