import { Input, Box, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { CellType } from 'types'
import { format, parse } from 'utils'

interface Props {
  type?: CellType;
  value: string;
  onChange?: (newValue: string) => void;
}

const Cell: React.FC<Props> = ({ type = CellType.Input, value, onChange }) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      onChange(parse(ev.target.value).toString());
    },
    [onChange],
  );

  return (
    <Box flex={1}>
      {type === CellType.Input
        ? <Input value={/^\d+$/.test(value) ? format(Number(value)) : value} borderRadius={0} width="full" onChange={onChangeHandler} />
        : <Text>{value}</Text>
      }
    </Box>
  );
};

export default Cell;
