/* eslint-disable no-dupe-else-if */
/* eslint-disable no-mixed-operators */
import LoadingButton from '@src/modules/common/components/buttons/LoadingButton'
import CustomDataTable, {
  TableFormData
} from '@src/modules/common/components/CustomDataTable/CustomDataTable'
import Header from '@src/modules/common/components/header'
import { getPath } from '@src/router/RouteHelper'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { stateReducer } from '@src/utility/stateReducer'
import {
  emitAlertStatus,
  FM,
  hasExtension,
  isValid,
  isValidArray,
  log,
  SuccessToast,
  truncateText
} from '@src/utility/Utils'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import {
  Activity,
  Edit,
  MoreVertical,
  Plus,
  RefreshCcw,
  Rss,
  Sliders,
  Trash2,
  Upload,
  X
} from 'react-feather'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Form,
  Button,
  ButtonProps,
  Alert,
  InputGroupText,
  Badge
} from 'reactstrap'
import { DPR } from '@src/utility/types/typeDPR'
import FormGroupCustom from '@src/modules/common/components/formGroupCustom/FormGroupCustom'
import ApiEndpoints from '@src/utility/http/ApiEndpoints'
import { loadDropdown } from '@src/utility/http/Apis/dropdown'
import {
  useCreateOrUpdateConfigMutation,
  useDeleteConfigByIdMutation,
  useImportDprImportAllProjectsMutation,
  useLoadConfigMutation
} from '@src/modules/dpr/redux/RTKQuery/DprConfigRTK'
import ConfirmAlert from '@hooks/ConfirmAlert'
import { IconSizes } from '@src/utility/Const'
import DropDownMenu from '@src/modules/common/components/dropdown'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import BsTooltip from '@src/modules/common/components/tooltip'
import { Permissions } from '@src/utility/Permissions'
import ConfigFilter from '../Config/ConfigFilter'
import Show from '@src/utility/Show'
import toast from 'react-hot-toast'
import CreatableSelect from 'react-select/creatable'
import TagsInput from '@src/modules/common/components/tagsinput/TagsInput'

type States = {
  filterData?: any
  active?: string
  filterConfig?: boolean
  filterMap?: boolean
  filterImport?: boolean
  filterLog?: boolean
  filterDirect?: boolean
  loading?: boolean
  list?: any
  formData?: any
  page?: any
  per_page_record?: any
  search?: any
  reload?: any
  showModal?: boolean
  rowData?: any
  isAddingNewData?: boolean
  lastRefresh?: any
  configFilter?: boolean
  id?: any
  profile_name?: any
  file?: any
}

const DPRTable = () => {
  const initState: States = {
    page: 1,
    showModal: false,
    rowData: {},
    per_page_record: 40,
    search: '',
    lastRefresh: new Date().getTime(),
    active: '1',
    filterConfig: false,
    filterMap: false,
    filterImport: false,
    filterLog: false,
    filterDirect: false,
    loading: false,
    list: [],
    formData: {
      id: null,
      sheet_name: null,
      name: null,
      cell_value: null,
      row_position: null,
      row_new_position: null
    },
    id: null,
    profile_name: null
  }
  const { colors } = useContext(ThemeColors)
  const form = useForm<DPR>({
    defaultValues: {
      profile_name: ''
    }
  })
  const params = useParams()
  const { handleSubmit, control, reset, setValue, watch } = form
  const [tags, setTags] = useState<string[]>([])
  const [tagInputValue, setTagInputValue] = useState('')

  // Remove tag by filtering it out
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Handle key press (Enter or comma) to add tag
  const handleTagKeyDown = (event) => {
    if (!tagInputValue) return

    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      const newTag = tagInputValue.trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagInputValue('')
    }
  }
  const [loadingData, setLoading] = useState(false)
  const reducers = stateReducer<States>
  const [state, setState] = useReducer(reducers, initState)
  const navigate = useNavigate()
  const [loadConfig, { data, isLoading }] = useLoadConfigMutation()
  const [importDPR, result] = useImportDprImportAllProjectsMutation()
  const handlePageChange = (e: TableFormData) => {
    setState({ ...e })
  }
  const configData = data?.data
  log(configData, 'configData')

  const reloadData = () => {
    setState({
      lastRefresh: new Date().getTime()
    })
  }

  const moveTo = useCallback(() => {
    if (isValid(watch('profile_name'))) {
      const profile = watch('profile_name')?.extra
      navigate(getPath('dpr.update', { id: profile?.id, name: profile?.profile_name }), {
        state: {
          id: profile?.id,
          name: profile?.profile_name,
          hideTab: true
        }
      })
    }
  }, [watch('profile_name')])

  log(result, 'result')

  useEffect(() => {
    if (result?.isSuccess === true) {
      toast.success(result?.data?.message)
    }
  }, [result])

  // useEffect(() => {
  //   moveTo()
  // }, [state?.id, state?.profile_name])

  const onSubmitData = async (d: any) => {
    log(d)
    if (isValidArray(d?.file)) {
      if (hasExtension(d.file[0]?.name, ['.xlsx', '.xls', '.csv'])) {
        importDPR({
          file: d?.file[0],
          sheet_name: d?.sheet_name
        })
      } else {
        // setError('file', { type: 'custom' })
      }
    } else {
      //   setError('file', { type: 'custom' })
    }
    // const subData = {
    //   automation_email_trigger: triggerValue,
    //   execution_time: data?.execution_time
    // }
    // try {
    //   setLoading(true) // 👈 start loader
    //   const response = await updateEmail(subData) // 👈 wait for API
    //   // agar success aaya
    //   //   console.log('✅ API Success:', response)
    // } catch (error) {
    //   //   console.error('❌ API Error:', error)
    // } finally {
    //   setLoading(false) // 👈 stop loader always
    // }
  }


  //handlesubmit
  // const onSubmitData = async (d: any) => {
  //   if (!isValidArray(d?.file)) return

  //   if (!hasExtension(d.file[0]?.name, ['.xlsx', '.xls', '.csv'])) return

  //   // ✅ TagsInput gives string[]
  //   const sheetNameString =
  //     d?.all_sheet === 1
  //       ? ''
  //       : Array.isArray(d?.sheet_name)
  //         ? d.sheet_name
  //           .map((v: string) => v.trim())
  //           .filter(Boolean)
  //           .join(', ')
  //         : ''

  //   if (d?.all_sheet !== 1 && !sheetNameString) return

  //   // ✅ FINAL SUBMIT (NO ARRAY)
  //   importDPR({
  //     file: d.file[0],
  //     sheet_name: sheetNameString, // 🔥 STRING ONLY
  //     all_sheet: d?.all_sheet === 1
  //   })
  // }


  useEffect(() => {
    if (watch('all_sheet') === 1) {
      setValue('sheet_name', '')
    }
  }, [watch('all_sheet')])

  log(watch('sheet_name'))

  return (
    <>
      <ConfigFilter
        show={state?.configFilter}
        filterData={state?.filterData}
        setFilterData={(e: any) => setState({ filterData: e, page: 1 })}
        handleFilterModal={() => {
          setState({
            configFilter: false
          })
        }}
      />
      <Header icon={<Activity size='25' />} title={FM('dpr-interface')}></Header>
      <Card>
        <CardBody>
          <Row>
            <Show IF={Permissions.interfaceBrowse}>
              <Col md='8'>
                <FormGroupCustom
                  label={FM('select-config')}
                  name={'profile_name'}
                  type={'select'}
                  className='mb-2'
                  path={ApiEndpoints.list_config}
                  selectLabel='profile_name'
                  selectValue={'id'}
                  jsonData={{
                    status: 1
                  }}
                  async
                  defaultOptions
                  loadOptions={loadDropdown}
                  isClearable
                  control={control}
                  rules={{
                    required: false
                  }}
                />
              </Col>
            </Show>
            <Col sm='3'>
              <LoadingButton
                block
                loading={isLoading}
                className='mt-2'
                color='primary'
                type='submit'
                onClick={moveTo}
              >
                {FM('submit')}
              </LoadingButton>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <h4 className='text-center pt-1 pb-1'>Or</h4>
      <Form onSubmit={form.handleSubmit(onSubmitData)}>
        <Card>
          <CardBody>
            <Row>
              {/* <div className="mt-2">
      <h5 className="mt-1 fw-bolder">Tag</h5>

      <div className="tags-input-container d-flex flex-wrap align-items-center border p-1 rounded">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            color="primary"
            className="d-flex align-items-center me-1 mb-1"
          >
            {tag}
            <X
              size={14}
              className="ms-1"
              style={{ cursor: 'pointer' }}
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}

        <CreatableSelect
          isClearable={false}
          isSearchable
          value={null} // no controlled selection, just free input
          inputValue={tagInputValue}
          onInputChange={setTagInputValue}
          onKeyDown={handleTagKeyDown}
          placeholder="Enter text here"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              border: 0,
              boxShadow: 'none',
              minWidth: '150px',
              flexGrow: 1,
            }),
            container: (base) => ({
              ...base,
              flexGrow: 1,
              minWidth: '150px',
            }),
            input: (base) => ({ ...base, margin: 0, padding: 0 }),
          }}
          onChange={(selectedOption:any) => {
            if (selectedOption && !tags.includes(selectedOption.value)) {
              setTags([...tags, selectedOption.value])
            }
            setTagInputValue('')
          }}
        />
      </div>
    </div> */}
              <Col md={12} className='mb-1'>
                You can import all project mapping data through a single Excel file
              </Col>
              <Col md='4'>
                <FormGroupCustom
                  key={String(result.isError) + String(result.isSuccess)}
                  label={FM('sheet-name')}
                  name={'sheet_name'}
                  type={'text'}
                  defaultValue={'Summary'}
                  className='mb-0'
                  control={control}
                  rules={{ required: false }}
                />

                {/* <TagsInput
                  name="sheet_name"
                  control={control}
                  label="Sheet Name"
                  placeholder="Sheet Name"

                  prepend={

                    <BsTooltip title={FM('all-sheet')}>
                      <FormGroupCustom
                        key={String(result.isError) + String(result.isSuccess)}
                        noLabel
                        label={FM('all-sheet')}
                        name={`all_sheet`}
                        type={'checkbox'}
                        control={control}
                        className={'ms-1 me-25'}
                        rules={{
                          required: false
                        }}
                      />
                    </BsTooltip>

                  }
                  isDisabled={watch('all_sheet') === 1}
                /> */}
                {/* <FormGroupCustom
                  key={String(result.isError) + String(result.isSuccess) + `${watch('all_sheet')}`}
                  label={FM('sheet-name')}
                  name={'sheet_name'}
                  type={'text'}
                  // defaultValue={'SUMMARY'}
                  defaultValue={watch(`all_sheet`) === 1 ? '' : 'SUMMARY'}
                  isDisabled={watch(`all_sheet`) === 1}
                  className='mb-0'
                  commaSeparated={true}
                  control={control}
                  
                  rules={{ required: false }}
                  prepend={
                    <InputGroupText className='p-25'>
                      <BsTooltip title={FM('all-sheet')}>
                        <FormGroupCustom
                          key={String(result.isError) + String(result.isSuccess)}
                          noLabel
                          label={FM('all-sheet')}
                          name={`all_sheet`}
                          type={'checkbox'}
                          control={control}
                          className={'ms-1 me-25'}
                          rules={{
                            required: false
                          }}
                        />
                      </BsTooltip>
                    </InputGroupText>
                  }
                /> */}
                {/* {watch('sheet_name') && (
    <div
      style={{
        marginTop: '0.25rem',
        fontSize: '0.875rem',
        color: '#6c757d', // bootstrap text-muted
        userSelect: 'none'
      }}
    >
      {watch('sheet_name')
        .toString()
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .map((item, index, arr) => (
          <span key={index}>
            <strong>{item}</strong>
            {index < arr.length - 1 ? ', ' : ''}
          </span>
        ))}
    </div>
  )} */}
              </Col>
              <Col md='4'>
                <FormGroupCustom
                  label={FM('upload-excel-file')}
                  accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                  name={'file'}
                  key={String(result.isError) + String(result.isSuccess)}
                  type={'file'}
                  className='mb-0'
                  errorMessage={'Please select only .xlsx or .xls extension file'}
                  control={control}
                  rules={{ required: true }}
                />
              </Col>

              <Col sm='3'>
                <LoadingButton
                  block
                  loading={result?.isLoading}
                  className='mt-2'
                  color='primary'
                  type='submit'
                >
                  <Upload size={14} /> {FM('upload')}
                </LoadingButton>
              </Col>
              <Col sm='11' className='mt-2'>
                <Alert
                  color='info'
                  className='mb-0 p-2 d-flex align-items-center rounded-3 shadow-sm'
                >
                  <strong className='me-1'>Note:</strong>
                  Upload the DPR report for all projects, and ensure that the Excel sheet file name
                  is the same for all project configurations.
                </Alert>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </>
  )
}

export default DPRTable
