export default class MoluluModel {
  constructor({ id, owner, HP, Attack, Defence, Accessories, type }) {
    this.id = id;
    this.owner = owner;
    this.HP = HP;
    this.Attack = Attack;
    this.Defence = Defence;
    this.Accessories = Accessories || [];
    this.type = type;
  }
}
