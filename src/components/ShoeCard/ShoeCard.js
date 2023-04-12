import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";
import { css } from "styled-components";

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper variant={variant}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price salePrice={salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice !== null && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
  &::before {
    content: ${(p) => {
      if (p.variant === "on-sale") {
        return '"Sale"';
      } else if (p.variant === "new-release") {
        return '"Just Released!"';
      }
    }};
    position: absolute;
    top: 12px;
    right: -4px;
    padding: 7px 9px;
    z-index: 9999;
    display: block;
    border-radius: 2px;
    background-color: ${(p) => (p.variant === "on-sale" ? COLORS.primary : COLORS.secondary)};
    line-height: 16px;
    color: ${COLORS.white};
    font-weight: ${WEIGHTS.medium};
    font-size: 0.85rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 340px;
  height: 312px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${COLORS.gray[900]};
  ${(p) =>
    p.salePrice &&
    css`
      text-decoration: line-through;
      color: ${COLORS.gray[700]};
    `};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
