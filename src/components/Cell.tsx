import { Input, Box, Text } from '@chakra-ui/react';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { CellType } from 'types'
import { format, parse } from 'utils'

interface Props {
  type?: CellType;
  row?: number;
  col?: number;
  value: string;
  isSelected?: boolean;
  onChange?: (newValue: string) => void;
  onSelect?: (row: number, col: number) => void;
}

const Cell: React.FC<Props> = ({ type = CellType.Input, value, isSelected = false, row, col, onChange, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      onChange(parse(ev.target.value).toString());
    },
    [onChange],
  );

  const handleDoubleClick = () => {
    emitUnselectAllEvent()
    setIsEditing(true)
  }

  const handleClick = () => {
    onSelect(row, col)
    emitUnselectAllEvent()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => { 
    if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      return;
    }
    setIsEditing(true)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => { 
    e.stopPropagation()
    if(e.keyCode === 13) {
      setIsEditing(false)
    }
  }

  const handleUnselectAll = () => {
    setIsEditing(false)
  }

  const emitUnselectAllEvent = () => {
    const unselectAllEvent = new Event('unselectAll')
    window.document.dispatchEvent(unselectAllEvent)
  }

  useEffect(() => {
    if(isSelected){
      inputRef.current.focus()
    }
  }, [isSelected])

  useEffect(() => {
    window.document.addEventListener('unselectAll', handleUnselectAll)

    return () => {
      window.document.removeEventListener('unselectAll', handleUnselectAll)
    };
  }, [])

  const formattedValue = /^\d+$/.test(value) ? format(Number(value)) : value
  const focusStyle = {
    outLine: 'none',
    borderColor: isSelected ? '#ff0078' : 'rgba(0, 0, 0, 0.24)'
  }
  const borderColor = isEditing ? 'black' : isSelected ? '#ff0078' : 'rgba(0, 0, 0, 0.24)'

  return (
    <Box flex={1}>
      {type === CellType.Input
        ? isEditing ? (
            <Input
              onKeyDown={handleEditKeyDown}
              onChange={onChangeHandler}
              borderRadius="0"
              border="2px"
              borderColor={borderColor}
              height="full"
              width="full"
              p="0"
              value={formattedValue}
            />
          ) : (
            <Input
              ref={inputRef}
              isReadOnly={true}
              onDoubleClick={handleDoubleClick}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              cursor="pointer"
              border="1px solid"
              borderColor={borderColor}
              p="0"
              borderRadius="0"
              height="full"
              width="full"
              _focus={focusStyle}
              value={formattedValue}
            />
          )
        : (
          <Text textAlign="center">{value}</Text>
        )
      }
    </Box>
  );
};

export default Cell;
