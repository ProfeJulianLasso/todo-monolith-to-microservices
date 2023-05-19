import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'email';

export class StatusValueObject extends ValueObjectAbstract<boolean> {
  private schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  validateData(): void {
    if (!this.schema)
      this.schema = Joi.object({
        value: Joi.boolean()
          .required()
          .sensitive()
          .messages({
            'boolean.base': `El ${FIELD_NAME} del rol debe ser de tipo booleano`,
            'any.required': `El ${FIELD_NAME} del rol es requerido`,
          }),
      });
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
