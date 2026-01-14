/* eslint-disable no-dupe-else-if */
/* eslint-disable no-mixed-operators */
import LoadingButton from '@src/modules/common/components/buttons/LoadingButton'
import FormGroupCustom from '@src/modules/common/components/formGroupCustom/FormGroupCustom'
import Header from '@src/modules/common/components/header'
import Shimmer from '@src/modules/common/components/shimmers/Shimmer'
import 'react-multi-email/dist/style.css'
import { useAppDispatch } from '@src/redux/store'
import { Patterns } from '@src/utility/Const'
import { stateReducer } from '@src/utility/stateReducer'
import { DPR } from '@src/utility/types/typeDPR'
import {
    fillObject,
    FM,
    formatAndSetData,
    isValid,
    JsonParseValidate,
    log,
    setValues,
    SuccessToast
} from '@src/utility/Utils'
import { useEffect, useReducer, useState } from 'react'
import { ReactMultiEmail, isEmail } from 'react-multi-email'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardBody, Col, Form, Label, Row } from 'reactstrap'
import {
    useCreateOrUpdateProjectMutation,
    useLoadProjectDetailsByIdMutation
} from '../../redux/RTKQuery/ProjectRTK'
import { join } from 'path'
import { XCircle } from 'react-feather'
import { useCreateOrUpdateSheetMutation, useLoadSheetDetailsByIdMutation } from '../../redux/RTKQuery/SheetRTK'


interface States {
    lastRefresh?: any
    random?: any
    loading?: boolean
    text?: string
    list?: any
    active?: string
    formData?: DPR | any
}

const SheetForm = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const params = useParams()
    const form = useForm<DPR>({
        defaultValues: {
            id: null,
            name: null,
            description: '',
            workPackId: null,
            unit_of_measure: null,
            man_power_type: null
        }
    })
    const { handleSubmit, control, reset, setValue, watch } = form
    const [loading, setLoading] = useState(false)
    const [dprReportEmails, setDprReportsEmail] = useState<string[]>([])
    const [reminderEmails, setReminderEmails] = useState<string[]>([])
    const [focused, setFocused] = useState(false)
    const initState: States = {
        lastRefresh: new Date().getTime(),
        random: null,
        loading: false,
        text: '',
        list: [],
        active: '1',
        formData: {
            id: null,
            name: null,
            description: null,
            projectId: null
        }
    }

    const reducers = stateReducer<States>
    const [state, setState] = useReducer(reducers, initState)

    const [createSheet, result] = useCreateOrUpdateSheetMutation()
    const [getSheet, { data, isSuccess, isLoading }] = useLoadSheetDetailsByIdMutation()

    const getData: any = data?.data

    useEffect(() => {
        if (result.isSuccess) {
            // SuccessToast(FM('executed-successfully'))
            reset()
        }
    }, [result])
    useEffect(() => {
        if (isValid(params?.id)) {
            getSheet({
                id: params?.id
            })
        }
    }, [params?.id])

    //['testEMail@gmail.com', 'another@gmail.com']   remove [] and convert  data like "testEMail@gmail.com,another@gmail.com"

    const sendEmails = (emails: string[]) => {
        const emailList = emails?.filter((email) => email !== '')
        return `${emailList?.join(',')}`
    }

    //"dfsg@gmail.com,dsfs@gmail.com"  convert to ["dfsg@gmail.com","dsfs@gmail.com"]
    const getEmails = (emails: string) => {
        const emailList = emails?.split(',')
        return emailList
    }

    useEffect(() => {
        if (isValid(getData) && getData !== undefined) {
            const f = fillObject<DPR>(state.formData, getData)
            const formData: DPR = {
                ...f,
                orderno: getData?.orderno,
                uom:getData?.uom,

            }
            setValues<DPR>(formData, setValue)
        
        }
    }, [getData])

    const onSubmit = (e: DPR) => {
     
        if (isValid(params?.id)) {
            createSheet({
                id: params?.id,
                ...e
             
            })
        } else {
            createSheet({
                ...e
                
            })
        }
    }

    useEffect(() => {
        if (result?.isSuccess) {
            nav(-1)
        }
    }, [result?.isSuccess])

    const Reset = (e: DPR) => {
        reset()
        setReminderEmails([])
        setDprReportsEmail([])
    }

    return (
        <>
            <Header
                onClickBack={() => nav(-1)}
                goBackTo
                title={isValid(params?.id) ? FM('sheet-update') : <>{FM('sheet-create')}</>}
            ></Header>
            {loading ? (
                <>
                    <Row>
                        <Col md='12' className='d-flex align-items-stretch'>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md='6'>
                                            <Shimmer style={{ height: 40 }} />
                                        </Col>
                                        <Col md='6'>
                                            <Shimmer style={{ height: 40 }} />
                                        </Col>
                                        <Col md='12' className='mt-2'>
                                            <Shimmer style={{ height: 320 }} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Col md='12' className=''>
                                <Card>
                                    <CardBody className='pt-2'>
                                        <Row>
                                            <Col md='4'>
                                                <FormGroupCustom
                                                    name={'name'}
                                                    label={FM('name')}
                                                    type={'text'}
                                                    onRegexValidation={{
                                                        form: form,
                                                        fieldName: 'name'
                                                    }}
                                                    className='mb-2'
                                                    control={control}
                                                    rules={{
                                                        required: true
                                                        // pattern: Patterns.AlphaNumericWithAtperSpaceHash
                                                    }}
                                                />
                                            </Col>
                                               <Col md='4'>
                                                <FormGroupCustom
                                                    name={'uom'}
                                                    label={FM('uom')}
                                                    type={'text'}
                                                    onRegexValidation={{
                                                        form: form,
                                                        fieldName: 'uom'
                                                    }}
                                                    className='mb-2'
                                                    control={control}
                                                    rules={{
                                                        required: false
                                                        // pattern: Patterns.AlphaNumericWithAtperSpaceHash
                                                    }}
                                                />
                                            </Col>
                                            <Col md='4'>
                                                <FormGroupCustom
                                                    name={'orderno'}
                                                    label={FM('order-no')}
                                                    type={'number'}
                                                    className='mb-2'
                                                    control={control}
                                                    rules={{ required: false }}
                                                />
                                            </Col>

                                            <Col md='12'>
                                                <FormGroupCustom
                                                    name={'description'}
                                                    label={FM('description')}
                                                    onRegexValidation={{
                                                        form: form,
                                                        fieldName: 'description'
                                                    }}
                                                    type={'textarea'}
                                                    className='mb-2'
                                                    control={control}
                                                    rules={{ required: true }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                         
                                        </Row>
                                        <Row className='d-flex justify-content-start'>
                                            <Col md='6'>
                                                <LoadingButton
                                                    block
                                                    loading={result.isLoading}
                                                    className='mt-2 mb-3'
                                                    color='primary'
                                                    type='submit'
                                                >
                                                    <>{FM('save')}</>
                                                </LoadingButton>
                                            </Col>
                                            <Col md='6'>
                                                <LoadingButton
                                                    block
                                                    loading={false}
                                                    className='mt-2 mb-3'
                                                    color='warning'
                                                    type='reset'
                                                    onClick={(e: any) => {
                                                        Reset(e)
                                                    }}
                                                >
                                                    <>{FM('reset')}</>
                                                </LoadingButton>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </>
    )
}

export default SheetForm
