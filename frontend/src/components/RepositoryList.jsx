import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useDebounce } from 'use-debounce';


import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { withRouter } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    backgroundColor: theme.colors.bgLightUnfocused,
    flex: 1
  },
  loadingText: {
    backgroundColor: 'white',
    flexGrow: 1,
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 30
  },
  picker: {
    color: theme.colors.textPrimary,
    marginHorizontal: 10
  },
  headerSearchBar: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16,
    color: theme.colors.textSecondary
  }
});



const ItemSeparator = () => <View style={styles.separator} />;

const OrderSelectPicker = ({setSorting, sorting}) => (
  <Picker
    style={styles.picker}
    selectedValue={sorting}
    prompt="Sort by"
    onValueChange={(itemValue) =>
      setSorting(itemValue)
    }>
    <Picker.Item label="Latest Repositories" value="latest" />
    <Picker.Item label="Highest Rated Repositories" value="highestRated" />
    <Picker.Item label="Lowest Rated Repositories" value="lowestRated" />
  </Picker>
);


export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const {searchKeyword, setSearchKeyword, sorting, setSorting} = props;
  
    return (
      <>
        <TextInput
          style={styles.headerSearchBar} 
          placeholder="Search..."
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
        />
        <OrderSelectPicker 
          setSorting={setSorting} 
          sorting={sorting} 
        />
      </>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    // const history = useHistory();
    const history = this.props.history;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const Item = ({item}) => (
      <TouchableOpacity onPress={handleItemClick(item.id)}>
        <RepositoryItem item={item} />
      </TouchableOpacity>
    );

    const handleItemClick = (id) => (
      () => {
        history.push(`/repo/${id}`);
      }
    );

    return (
      <FlatList
        data={repositoryNodes}
        // data={mockRepositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={Item}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        ListHeaderComponent={this.renderHeader()}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RoutedRepositoryListContainer = withRouter(RepositoryListContainer);


const RepositoryList = () => {
  const [neverLoaded, setNeverLoaded] = useState(true);
  const [orderBy, setOrderBy] = useState(undefined);
  const [orderDirection, setOrderDirection] = useState(undefined);
  const [sorting, setSorting] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, loading, fetchMore, data } = useRepositories(8, orderDirection, orderBy, debouncedSearchKeyword);

  const onEndReach = () => {
    console.log('End reached');
    fetchMore();
  };

  useEffect(() => {
    switch (sorting) {
      case "highestRated":
        setOrderBy('RATING_AVERAGE');
        setOrderDirection("DESC");
        break;
      case "lowestRated": 
        setOrderBy('RATING_AVERAGE');
        setOrderDirection("ASC");
        break;
      default:
        setOrderBy('CREATED_AT');
        setOrderDirection("DESC");
    }

  }, [sorting]);

  if (loading && !repositories && neverLoaded) {
    setNeverLoaded(false);
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  
  return (
    <RoutedRepositoryListContainer 
      repositories={repositories} 
      setSorting={setSorting} 
      sorting={sorting}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;