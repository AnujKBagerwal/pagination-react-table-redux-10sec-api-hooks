import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getPostsData } from '../store/actionCreator';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import DisplayData from './DisplayData';

const Controller = (props) => {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const apiPageRef = useRef(page);
  apiPageRef.current = page;

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(apiPageRef.current + 1);
      props.getPostsData(apiPageRef.current);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      sortable: true,
      filterable: true,
      headerStyle: {
        justifyContent: 'center',
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    },
    {
      Header: 'URL',
      accessor: 'url',
      sortable: false,
      filterable: true,
      headerStyle: {
        justifyContent: 'center',
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textOverflow: 'ellipsis',
      },
    },
    {
      Header: 'Author',
      accessor: 'author',
      sortable: false,
      filterable: true,
      headerStyle: {
        justifyContent: 'center',
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      Header: 'Created Date',
      accessor: 'created_at',
      filterable: false,
      sortable: true,
      headerStyle: {
        justifyContent: 'center',
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      Cell: ({ row }) => renderDate(row),
    },
    {
      Header: 'Action',
      sortable: false,
      Cell: ({ row }) => renderActionButton(row),
    },
  ];

  const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined && row[id] !== null
      ? String(row && row[id].toLowerCase()).includes(
          filter && filter.value.toLowerCase()
        )
      : true;
  };

  const renderDate = (row) => {
    let date = moment(row._original.created_at).format('DD-MM-YYYY HH:mm');
    return <p>{date}</p>;
  };

  const renderActionButton = (row) => {
    return (
      <Button
        onClick={() => {
          setModal(true);
          setSelectedData(row._original);
        }}
      >
        Show
      </Button>
    );
  };

  const modalClose = () => {
    setModal(false);
    setSelectedData({});
  };

  //   console.log('props', selectedData);
  return (
    <div>
      <ReactTable
        data={props.posts}
        noDataText="No Data Found"
        columns={columns}
        defaultFilterMethod={(filter, row) =>
          filterCaseInsensitive(filter, row)
        }
      />

      {modal && (
        <DisplayData
          modal={modal}
          modalClose={modalClose}
          selectedData={selectedData}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    loader: state.loader,
  };
};

const mapDispatchToProps = { getPostsData };

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
