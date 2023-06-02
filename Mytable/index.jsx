import React, { useState, useRef } from 'react';
import { Form, Button, Table, Divider, Drawer, Popconfirm } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import TableHoc from 'components/Hoc/tableHoc';
import Edit from './edit';
import Detail from './detail';
import 'public/css/defaultTable.less';
import sysJobApi from 'api/hzsskl/sysJob';

const searchFields = [];

const SysJob = (props) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [pkInfo, setPkInfo] = useState({});
  const formRef = useRef(null);

  const closeAddPage = (isReloadTable) => {
    setAddVisible(false);
    if (isReloadTable) {
      handleSearch('add');
    }
  };

  const closeEditPage = (isReloadTable) => {
    setEditVisible(false);
    if (isReloadTable) {
      handleSearch('update');
    }
  };

  const handleDelete = (record) => {
    // 删除操作
  };

  const handleSearch = (type) => {
    // 查询操作
  };

  const pageRowsChange = (page, pageSize) => {
    // 分页操作
  };

  const getFields = (searchFields) => {
    // 获取表单项
  };

  const setFormRef = (formRef) => {
    // 设置表单引用
  };

  const setRowSelectedId = (jobId) => {
    // 设置选中行的ID
  };

  const getRowClassName = (jobId) => {
    // 获取选中行的类名
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'rownum',
      key: 'rownum',
      width: 40,
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span>
          <a onClick={() => setEditVisible(true, setPkInfo(record))}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => setDetailVisible(true, setPkInfo(record))}>详情</a>
          <Divider type="vertical" />
          <Popconfirm
            placement="left"
            icon={<ExclamationCircleFilled style={{ color: '#F63A43' }} />}
            title={`确定要删除吗?`}
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  const { page, pageSize, pageSizeOptions, total, dataSource } = props.tableInfo;

  const scrollY = window.innerHeight - 280;

  return (
    <div className="default-table">
      <div className="content">
        <div className="table-container">
          <div className="query-panel">
            <Form layout="inline" ref={formRef}>
              {getFields(searchFields)}
              <Form.Item>
                <Button type="primary" ghost onClick={() => handleSearch('search')}>
                  查询
                </Button>
              </Form.Item>
            </Form>
            <span>
              <Button type="primary" onClick={() => setAddVisible(true, setPkInfo({}))}>
                添加
              </Button>
            </span>
          </div>
          <div className="table-pagination">
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="jobId"
              scroll={{ y: scrollY }}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: total,
                pageSizeOptions: pageSizeOptions,
                showSizeChanger: true,
                onShowSizeChange: pageRowsChange,
                showTotal: (total) => `共${total}条`,
                showQuickJumper: true,
                onChange: pageRowsChange
              }}
              onRow={(record) => {
                //表格行点击事件
                return {
                  onClick: () => setRowSelectedId(record.jobId)
                };
              }}
              rowClassName={(record) => getRowClassName(record.jobId)}
            />
          </div>
        </div>
      </div>
      {addVisible ? (
        <Drawer title="添加" onClose={() => closeAddPage(false)} visible={addVisible} width={'60%'}>
          <Edit handleClose={closeAddPage} />
        </Drawer>
      ) : null}
      {editVisible ? (
        <Drawer
          title="修改"
          onClose={() => closeEditPage(false)}
          visible={editVisible}
          width={'60%'}
        >
          <Edit pkInfo={pkInfo} handleClose={closeEditPage} />
        </Drawer>
      ) : null}
      {detailVisible ? (
        <Drawer
          title="详情"
          onClose={() => {
            setDetailVisible(false);
          }}
          visible={detailVisible}
          width={'60%'}
        >
          <Detail pkInfo={pkInfo} />
        </Drawer>
      ) : null}
    </div>
  );
};

export default TableHoc(SysJob, sysJobApi);
