function suma(a: number, b: number) {
    return a + b;
}

test('El resultado de 1 + 1 debe ser igual a 2', () => {
    const data: { [key: string]: number } = { one: 1 };
    data['two'] = 3;
    expect(data).toEqual({ one: 1, two: 3 });
});
