import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'name';

export class NameValueObject extends ValueObjectAbstract<string> {
  private schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  validateData(): void {
    if (!this.schema)
      this.schema = Joi.object({
        value: Joi.string()
          .required()
          .min(4)
          .max(20)
          .messages({
            'string.base': `El ${FIELD_NAME} del usuario debe ser de tipo texto`,
            'string.empty': `El ${FIELD_NAME} del usuario no puede estar vacío`,
            'string.min': `El ${FIELD_NAME} del usuario debe tener una longitud mínima de {#limit}`,
            'string.max': `El ${FIELD_NAME} del usuario debe tener una longitud máxima de {#limit}`,
            'any.required': `El ${FIELD_NAME} del usuario es requerido`,
          }),
      });
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
