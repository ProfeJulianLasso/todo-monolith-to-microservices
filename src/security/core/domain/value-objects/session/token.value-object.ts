import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'token';

export class TokenValueObject extends ValueObjectAbstract<string> {
  private schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  validateData(): void {
    if (!this.schema)
      this.schema = Joi.object({
        value: Joi.string()
          .required()
          .guid({ version: 'uuidv4' })
          .messages({
            'string.base': `El ${FIELD_NAME} de la sesión debe ser de tipo texto`,
            'string.empty': `El ${FIELD_NAME} de la sesión no puede estar vacío`,
            'string.guid': `El ${FIELD_NAME} de la sesión debe ser un uuid valido`,
            'any.required': `El ${FIELD_NAME} de la sesión es requerido`,
          }),
      });
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
