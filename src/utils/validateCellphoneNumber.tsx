export const validateCellphoneNumber = (cellphoneNumber: string) => {
    const regularExpression = /^(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}$/;
    return regularExpression.test(cellphoneNumber);
}