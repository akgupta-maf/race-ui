import { themeQuartz } from 'ag-grid-community';

export const agGridTheme = themeQuartz.withParams({
  fontFamily: 'Inter',
  fontSize: '12px',
  headerHeight: '40px',
  rowHeight: '36px',
  headerFontFamily: 'Inter',
  cellFontFamily: 'Inter',
  headerFontWeight: '600',
  // headerBackgroundColor: 'rgb(49, 37, 28)',
  headerBackgroundColor: 'rgb(240, 234, 222)',
  headerTextColor: 'rgb(49, 37, 28)',
  headerColumnResizeHandleColor: 'rgb(180, 151, 90)',
  headerRowBorder: {
    color: 'rgb(180, 151, 90)',
    width: 0.25,
  },
  rowHoverColor: 'rgb(240, 234, 222)',
  oddRowBackgroundColor: 'rgb(248, 250, 252)',
  borderColor: 'rgb(226, 232, 240)',
  cellHorizontalPaddingScale: 1.2,
  columnBorder: true,
});
