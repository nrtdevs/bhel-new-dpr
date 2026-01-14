import React, { ReactNode, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { Badge } from 'reactstrap'
import { X } from 'react-feather'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type OptionType = {
  label: string
  value: string
}

interface TagsInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string              // ✅ added
  placeholder?: string
  defaultTags?: string[]
  prepend?: ReactNode
  isDisabled?: boolean
}

function TagsInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Sheet Name',
  defaultTags = ['SUMMARY'],
  prepend,
  isDisabled = false,
}: TagsInputProps<T>) {
  const [tagInputValue, setTagInputValue] = useState('')

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultTags as any}
      render={({ field: { value, onChange } }) => {
        const tags: string[] = Array.isArray(value) ? value : []

        const removeTag = (tag: string) => {
          onChange(tags.filter(t => t !== tag))
        }

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (!tagInputValue) return

          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const newTag = tagInputValue.trim()
            if (newTag && !tags.includes(newTag)) {
              onChange([...tags, newTag])
            }
            setTagInputValue('')
          }
        }

        const handleSelectChange = (opt: OptionType | null) => {
          if (opt && !tags.includes(opt.value)) {
            onChange([...tags, opt.value])
          }
          setTagInputValue('')
        }

        return (
          <div>
            {/* ✅ LABEL */}
            {label && (
              <label className="form-label mb-50 fw-semibold">
                {label}
              </label>
            )}

            <div
              className="d-flex align-items-center border rounded"
              style={{ minHeight: 38 }}
            >
              {/* LEFT PREPEND */}
              {prepend && (
                <div className=" d-flex align-items-center border-end">
                  {prepend}
                </div>
              )}

              {/* RIGHT INPUT */}
              <div
                className="d-flex align-items-center flex-wrap px-2"
                style={{ flex: 1, gap: 6 }}
              >
                {tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    color="primary"
                    className="d-flex align-items-center"
                  >
                    {tag}
                    <X
                      size={12}
                      className="ms-50 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}

                <div style={{ flex: 1, minWidth: 120 }}>
                  <CreatableSelect
                    value={null}
                    inputValue={tagInputValue}
                    onInputChange={setTagInputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleSelectChange}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    isDisabled={isDisabled}
                    classNamePrefix="react-select"
                    styles={{
                      control: base => ({
                        ...base,
                        border: 0,
                        boxShadow: 'none',
                        minHeight: 34,
                      }),
                      input: base => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                      }),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default TagsInput
