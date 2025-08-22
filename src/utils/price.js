export const calculateOptionPrice = (options) =>
    options.reduce((sum, opt) => sum + (opt.extraPrice || 0) * opt.quantity, 0);

export const calculateTotalPrice = (basePrice, options, quantity) =>
    (basePrice + calculateOptionPrice(options)) * quantity;