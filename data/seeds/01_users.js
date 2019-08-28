exports.seed = function(knex) {
  return knex('user').insert([
    {
      user_name: 'pentesterson1',
      pass_hash: '$2a$10$mqJzlNmpH8BHD3RNfm3abO9CbJrgaRsXFY32ScAqWeAiaUYRV0mkq', // "password"
    },
    {
      user_name: 'pentesterson2',
      pass_hash: '$2a$10$mBPC/WYH3bZUerCBm.VpS.hrS/spaytzShrHkAEjrLr77V.erApGm', // "12345"
    },
  ]);
};
