import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';

import Cell from 'components/Cell';
import { CellType } from 'types';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [cellState, setCellState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  const [activeRow, setActiveRow] = useState(-1)
  const [activeCol, setActiveCol] = useState(-1)

  const handleSelectChange = (row = -1, col = -1) => {
    setActiveRow(row)
    setActiveCol(col)
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    switch (evt.keyCode) {
      case 37:
        setActiveCol(Math.max(activeCol - 1, 0))
        break;
      case 39:
        setActiveCol(Math.min(activeCol + 1, NUM_COLUMNS - 1))
        break;
      case 38:
        setActiveRow(Math.max(activeRow - 1, 0))
        break;
      case 40:
        setActiveRow(Math.min(activeRow + 1, NUM_ROWS - 1))
        break;
      default:
          break
    }
  }

  return (
    <Box width="full" onKeyDown={handleKeyDown} tabIndex={0}>
      {cellState.map((row, rowIdx) => {
        return (
          <>
            {rowIdx === 0 && (
              <Flex>
                {_.range(NUM_COLUMNS + 1).map(labelIndex => (
                  <Cell
                    key={labelIndex}
                    type={CellType.Text}
                    value={labelIndex > 0 ? `${String.fromCharCode('A'.charCodeAt(0) + labelIndex - 1)}` : ''}
                  />
                ))}
              </Flex>
            )}
            <Flex key={String(rowIdx)} flex={1}>
              {row.map((cellValue, columnIdx) => (
                <>
                  {columnIdx === 0 && <Cell type={CellType.Text} value={`${rowIdx + 1}`}/>}
                  <Cell
                    key={`${rowIdx}/${columnIdx}`}
                    value={cellValue}
                    row={rowIdx}
                    col={columnIdx}
                    isSelected={ activeCol === columnIdx && activeRow === rowIdx}
                    onSelect={handleSelectChange}
                    onChange={(newValue: string) => {
                      const newRow = [
                        ...cellState[rowIdx].slice(0, columnIdx),
                        newValue,
                        ...cellState[rowIdx].slice(columnIdx + 1),
                      ];
                      setCellState([
                        ...cellState.slice(0, rowIdx),
                        newRow,
                        ...cellState.slice(rowIdx + 1),
                      ]);
                    }}
                  />
                </>
              ))}
            </Flex>
          </>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
