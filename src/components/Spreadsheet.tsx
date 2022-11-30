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

  return (
    <Box width="full">
      {cellState.map((row, rowIdx) => {
        return (
          <>
            {rowIdx === 0 && (
              <Flex>
                {_.range(NUM_COLUMNS + 1).map(labelIndex => (
                  <Cell type={CellType.Text} value={labelIndex > 0 ? `Row ${labelIndex}` : ''}/>
                ))}
              </Flex>
            )}
            <Flex key={String(rowIdx)} flex={1}>
              {row.map((cellValue, columnIdx) => (
                <>
                  {columnIdx === 0 && <Cell type={CellType.Text} value={`Row ${rowIdx + 1}`}/>}
                  <Cell
                    key={`${rowIdx}/${columnIdx}`}
                    value={cellValue}
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
