import styled from 'styled-components';
import { COLORS, FONT_SIZE } from '../style_constants';

//SubTextを定義しているだけ。これをimportして使うことでサブテキストサブテキスト
export const SubText = styled.p`
  color: ${COLORS.SUB_TEXT};
  font-size: ${FONT_SIZE.BODY2};
`;
