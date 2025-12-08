import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('MoluluModule', (m) => {
  const molulu = m.contract('Molulu');

  return { molulu };
});
