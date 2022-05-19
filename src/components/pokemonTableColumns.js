const pokemonTableColumns = [
  {
    title: 'Pokémon',
    dataIndex: 'name',
    key: 'name',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: ' Movements',
    dataIndex: 'movements',
    key: 'movements',
  },
  {
    title: 'Sprite',
    dataIndex: 'sprite',
    key: 'sprite',
    render: (text, record) => {
      return (
        <div>
          <img width={80} height={80} src={record.sprite} alt="avatar" />
        </div>
      );
    },
  },
];

export default pokemonTableColumns;
