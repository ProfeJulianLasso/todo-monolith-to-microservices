import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'name';

export class NameValueObject extends ValueObjectAbstract<string> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: string) {
    super(value);
    this.schema = Joi.object({
      value: Joi.string()
        .required()
        .min(4)
        .max(20)
        .messages({
          'string.base': `El ${FIELD_NAME} del rol debe ser de tipo texto`,
          'string.empty': `El ${FIELD_NAME} del rol no puede estar vacío`,
          'string.min': `El ${FIELD_NAME} del rol debe tener una longitud mínima de {#limit}`,
          'string.max': `El ${FIELD_NAME} del rol debe tener una longitud máxima de {#limit}`,
          'any.required': `El ${FIELD_NAME} del rol es requerido`,
        }),
    });
  }

  validateData(): void {
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
