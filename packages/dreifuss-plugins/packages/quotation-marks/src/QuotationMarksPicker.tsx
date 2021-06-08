import React, { useEffect, useState} from 'react'
import {BaseEditor, BaseRange, Range, Editor, Transforms} from 'slate'

function insertQuotationMarks(
  editor: BaseEditor,
  selection: BaseRange | null,
  selectedQuotationMarks: string
) {
  if (selection) {
    const nodes = Array.from(
      Editor.nodes(editor, {
        at: selection
      })
    )
    const tuple = nodes[0]
    if (tuple) {
      Transforms.setSelection(editor, {
        anchor: {
          path: selection.anchor.path,
          offset: selection.anchor.offset
        },
        focus: {path: selection.focus.path, offset: selection.focus.offset}
      })
      if (Range.isCollapsed(selection)) {
        switch (selectedQuotationMarks) {
          case '""': {
            Transforms.insertText(editor, '"', {
              at: selection.anchor
            })
            Transforms.insertText(editor, '"', {
              at: selection.focus
            })
            break
          }
          case '‹›': {
            Transforms.insertText(editor, '›', {
              at: selection.anchor
            })
            Transforms.insertText(editor, '‹', {
              at: selection.focus
            })
            break
          }
          case '’’': {
            Transforms.insertText(editor, '’', {
              at: selection.anchor
            })
            Transforms.insertText(editor, '’', {
              at: selection.focus
            })
            break
          }
          default: {
            Transforms.insertText(editor, '»', {
              at: selection.anchor
            })
            Transforms.insertText(editor, '«', {
              at: selection.focus
            })
          }
        }
      } else {
        switch (selectedQuotationMarks) {
          case '""': {
            if (selection.anchor.offset > selection.focus.offset) {
              Transforms.insertText(editor, '"', {
                at: selection.anchor
              })
              Transforms.insertText(editor, '"', {
                at: selection.focus
              })
              break
            } else {
              Transforms.insertText(editor, '"', {
                at: selection.focus
              })
              Transforms.insertText(editor, '"', {
                at: selection.anchor
              })
              break
            }
          }
          case '‹›': {
            if (selection.anchor.offset > selection.focus.offset) {
              Transforms.insertText(editor, '›', {
                at: selection.anchor
              })
              Transforms.insertText(editor, '‹', {
                at: selection.focus
              })
              break
            } else {
              Transforms.insertText(editor, '›', {
                at: selection.focus
              })
              Transforms.insertText(editor, '‹', {
                at: selection.anchor
              })
              break
            }
          }
          case '’’': {
            if (selection.anchor.offset > selection.focus.offset) {
              Transforms.insertText(editor, '’', {
                at: selection.anchor
              })
              Transforms.insertText(editor, '’', {
                at: selection.focus
              })
              break
            } else {
              Transforms.insertText(editor, '’', {
                at: selection.focus
              })
              Transforms.insertText(editor, '’', {
                at: selection.anchor
              })
              break
            }
          }
          default: {
            if (selection.anchor.offset > selection.focus.offset) {
              Transforms.insertText(editor, '»', {
                at: selection.anchor
              })
              Transforms.insertText(editor, '«', {
                at: selection.focus
              })
            } else {
              Transforms.insertText(editor, '»', {
                at: selection.focus
              })
              Transforms.insertText(editor, '«', {
                at: selection.anchor
              })
            }
          }
        }
      }
    } else {
      Transforms.insertText(editor, selectedQuotationMarks)
      Transforms.select(editor, {
        anchor: {
          path: selection.anchor.path,
          offset: selection.anchor.offset
        },
        focus: {path: selection.focus.path, offset: selection.focus.offset}
      })
    }
  }
}

export function QuotationMarksPicker({editor}:any) {

  if (!editor) {
    return null
  }

  // const {togglePopover} = useContext(PopoverContext)
  const [selection, setSelection] = useState<BaseRange | null>(null)
  let selectedQuotationMarks = ''

  useEffect(() => {
    setSelection(editor?.selection)
  }, [])

  return (
    <menu>
      <button
        onClick={e => {
          e.preventDefault()
          selectedQuotationMarks = '«»'
          insertQuotationMarks(editor, selection, selectedQuotationMarks)
          // togglePopover()
        }}
        className="button">
        {'« »'}
      </button>

      <button
        onClick={e => {
          e.preventDefault()
          selectedQuotationMarks = '‹›'
          insertQuotationMarks(editor, selection, selectedQuotationMarks)
          // togglePopover()
        }}
        className="button">
        {' '}
        {'‹ ›'}{' '}
      </button>

      <button
        onClick={e => {
          e.preventDefault()
          selectedQuotationMarks = '’’'
          insertQuotationMarks(editor, selection, selectedQuotationMarks)
          // togglePopover()
        }}
        className="button">
        {' '}
        {'’ ’'}{' '}
      </button>

      <button
        onClick={e => {
          e.preventDefault()
          selectedQuotationMarks = '""'
          insertQuotationMarks(editor, selection, selectedQuotationMarks)
          // togglePopover()
        }}
        className="button">
        {' '}
        {'" "'}{' '}
      </button>
    </menu>
  )
}