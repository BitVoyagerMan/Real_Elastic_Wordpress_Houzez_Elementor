import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { AllowedEntityStatusColor } from 'Types/Domain';
import { IRoleDef } from 'Types/Domain';

import DrawerSpinner from '../../../Common/Components/DrawerSpinner';

import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  FlexBox,
  Column,
  Heading,
  Icon,
  Table,
  TextField,
} from 'engage-ui';

import {
  getAllowedMemberType,
  getBadgeStatus,
  getStatus,
} from '../../../Common/Utilities';


import { RoleListState } from './RoleListState';
import { RoleListProp } from './RoleListProp';
import { ROLE } from '../../../ThemeIdentifiers';

const baseTheme = require('../Styles/RoleList.scss');
const TableStyle = require('../../../Theme/Table.scss');
const CommonStyle = require('../../../Theme/ListTheme.scss');
/**
 * Component to display role def list & show different actions like filter, delete, individual actions
 * @extends React.Component
 */
class RoleListComponent extends React.Component<RoleListProp, RoleListState> {
  sortQuery: string = '[{"id":{"order":"desc"}}]';
  /*
    label: Table header lable which will be visible
    key: Match it with json data, this will help to get specific value from the data
    headerValue: In case of custom component, if any value is required, here it can be stored
    classname: any custom classname, this can be used to set width or any other style
    style: same like class but for inline styling
    noSort: if sorting="all" & we want to disable sorting of specifc column
    sort: Enable sorting for specific column
    injectBody: To inject custom component in td
    injectHeader: To inject custom component in th
  */
  private nestedColumnConfig: Array<{}> = [
    {
      label: 'Name',
      key: 'name',
      className: '',
      sortBy: 'keyword',
      style: { width: '160px' },
    }, {
      label: 'Description',
      key: 'description',
      noSort: true,
      style: { width: '300px' },
    }, {
      label: 'Status',
      key: 'entityState',
      style: { width: '120px' },
      sortBy: 'itemID',
      injectBody: (value: IRoleDef) =>
        <Badge working={value.processing} status={AllowedEntityStatusColor[value.processing ? 8 : getBadgeStatus(value)]}>{value.processing ? value.processing : getStatus(value)}</Badge>,
    }, {
      label: 'Type',
      key: 'allowedMemberTypes',
      style: { width: '215px' },
      sortBy: 'itemID',
      injectBody: (value: IRoleDef) => getAllowedMemberType(value.allowedMemberTypes),
    },
  ];

  // function needs to be called on onChange for checkBox
  private bulkOptions = () => {
    return [{
      content: <Checkbox label={'Show Deleted'} />
    }]
  };

  constructor(props: RoleListProp) {
    super(props);
    this.state = {
      actionInProgress: false,
      activeEntityId: 0,
      appDefId: 0,
      bulkAction: {
        selectedRow: [],
      },
      callBackAction: undefined,
      callChildCallback: false,
      dropdownEle: {},
      editMember: false,
      filterConfig: {
        searchKey: '',
        search: false,
        field: 'name',
      },
      hideRow: { },
      loadingRole: false,
      nestedChildData: [],
    };
  }

  // Callback function when any row gets selected
  handleSelectRowCallback = (val: React.ReactText[]) => {

  }

  // Toggle dropdowns present in this component
  toggleDropdown = (event: React.FormEvent<HTMLElement>, currentDropdown: string) => {
    this.setState({
      dropdownEle: { [currentDropdown]: event.currentTarget as HTMLElement },
    });
  }


  /**
   * Render the component to the DOM
   * @returns {}
   */
  render() {
    const { actionInProgress, bulkAction, dropdownEle, filterConfig, hideRow, loadingRole } = this.state;
    const {
      roleDefs,
      theme,
    } = this.props;

    const searchFieldStyle = classNames(
      theme.commonLeftMargin,
      theme.searchField,
    );

    return (
      <FlexBox>
        <Column medium="4-4">
          {
            loadingRole ?
              <div className={theme.spinnerContainer}>
                <DrawerSpinner componentClass={theme.espinner} spinnerText="Loading Roles"  />
              </div> : null
          }

          <div className={theme.pageContainer}>
            <Heading element="h2" theme={CommonStyle}>Roles</Heading>

            <FlexBox
              direction="Row"
              align="Start"
              justify="Start"
              componentClass={theme.tableActions}
            >
              <div>
                <Button
                  componentSize="large"
                  disclosure={true}
                  onClick={(event: React.FormEvent<HTMLElement>) => this.toggleDropdown(event, 'bulkAction')}
                  disabled={!bulkAction.selectedRow.length}>
                  Bulk Actions {bulkAction.selectedRow.length ? `(${bulkAction.selectedRow.length})` : ''}
                </Button>

                <Dropdown
                  dropdownItems={[]}
                  anchorEl={dropdownEle.bulkAction}
                  preferredAlignment="left"
                />
              </div>

              <div className={searchFieldStyle}>
                <TextField
                  disabled
                  label="Find a Role..."
                  suffix={<Icon source="search" componentColor="inkLighter"/>}
                  value={filterConfig.searchKey}
                />
              </div>

              <div className={theme.commonLeftMargin}>
                <Button
                  disabled={actionInProgress}
                  componentSize="large"
                  icon="horizontalDots"
                  onClick={(event: React.FormEvent<HTMLElement>) => this.toggleDropdown(event, 'filter')} />

                <Dropdown
                  dropdownItems={this.bulkOptions()}
                  anchorEl={dropdownEle.filter}
                  preferredAlignment="right"
                />
              </div>
            </FlexBox>

            {
              roleDefs ?
                <Table
                  actionInProgress={actionInProgress}
                  columnFirstChildWidth="25px"
                  hideRow={hideRow}
                  bordered={true}
                  highlight={true}
                  sorting="all"
                  data={roleDefs}
                  column={this.nestedColumnConfig}
                  filterData={filterConfig}
                  rowAction={[]}
                  rowCallbackValue="id"
                  selectRow="checkbox"
                  selectRowCallback={this.handleSelectRowCallback}
                  theme={TableStyle}
                /> : null
            }
          </div>
        </Column>
      </FlexBox>
    );
  }
}

export default themr(ROLE, baseTheme)(RoleListComponent) as ThemedComponentClass<RoleListProp, RoleListState>;
