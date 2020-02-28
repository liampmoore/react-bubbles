import React from 'react';

const ColorForm = ({handleSubmit, handleChange, formValue, handleCancel, title}) => {
    return (<form onSubmit={e => handleSubmit(e)}>
          <legend>{title}</legend>
          <label>
            color name:
            <input
              onChange={e =>
                handleChange({ ...formValue, color: e.target.value })
              }
              value={formValue.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                handleChange({
                  ...formValue,
                  code: { hex: e.target.value }
                })
              }
              value={formValue.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => handleCancel(false)}>cancel</button>
          </div>
        </form>)
}

export default ColorForm