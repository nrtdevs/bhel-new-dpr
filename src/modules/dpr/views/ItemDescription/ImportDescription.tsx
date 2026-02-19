/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import FormGroupCustom from '@src/modules/common/components/formGroupCustom/FormGroupCustom'
import CenteredModal from '@src/modules/common/components/modal/CenteredModal'
import Hide from '@src/utility/Hide'
import { FM, formatDate, hasExtension, isValidArray, log } from '@src/utility/Utils'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Badge, Card, CardBody, CardImg, Col, Row, Spinner } from 'reactstrap'
import { useGetSettingMutation } from '../../redux/RTKQuery/ProfileRTK'
import ApiEndpoints from '@src/utility/http/ApiEndpoints'
import { loadDropdown } from '@src/utility/http/Apis/dropdown'
import { useImportItemDescrptionAllMutation } from '../../redux/RTKQuery/DprConfigRTK'
import toast from 'react-hot-toast'

export type CategoryParamsType = {
    id?: string
    name: string
    status?: string
    patent_id?: string
}
interface dataType {
    edit?: any
    response?: (e: any) => void
    noView?: boolean
    showModal?: boolean
    setShowModal?: (e: boolean) => void
    Component?: any
    loading?: boolean
    children?: any

    // rest?: any
}

export default function ModalImport<T>(props: any) {
    const {
        edit = null,
        noView = false,
        showModal = false,

        setShowModal = () => { },
        Component = 'span',
        response = () => { },
        children = null,
        ...rest
    } = props

    const [open, setOpen] = useState(false)
    const form = useForm<any>()


    const { handleSubmit, control, reset, setValue, watch } = form

    const [importDPR, result] = useImportItemDescrptionAllMutation()
    const [loadingSample, setLoadingSample] = useState(false)
    const [loading, setLoading] = useState(false);

    const [loadSetting, { data, isSuccess, isLoading, isError }] = useGetSettingMutation();

    const appData = data?.data;

    // log(result?.data?.message, 'result');




    useEffect(() => {
        if (isSuccess) {
            window.open(`${appData?.["item-sample"]}`, '_blank')
        }
    }, [isSuccess])

    const openModal = () => {
        setOpen(true)
        reset()
    }
    const closeModal = () => {
        setOpen(false)
        setShowModal(false)
        reset()

    }


    useEffect(() => {
        if (result?.isSuccess === true) {
            toast.success(result?.data?.message)
            closeModal()
        }
    }, [result])
    const handleSave = async (d: any) => {
        log(d);
        if (isValidArray(d?.file)) {
            if (hasExtension(d.file[0]?.name, ['.xlsx', '.xls', '.csv'])) {
                try {
                    setLoading(true);
                    await importDPR({
                        file: d.file[0],
                        work_pack_id: d.work_pack_id?.value

                    });

                    // Optionally handle success here
                } catch (error) {
                    // Handle error if needed

                    setLoading(false)
                } finally {
                    setLoading(false);
                }
            }
        }
    };


    useEffect(() => {
        if (noView && showModal) {
            openModal()
        }
    }, [noView, showModal])

    const sampleBooking = () => {

        loadSetting({


        })


    }

    // useEffect(() => {
    //     if (result?.isSuccess) {
    //         actionCoupon({
    //             ids: [edit?.id],
    //             // eventId,
    //             originalArgs: couponResult?.originalArgs,
    //             jsonData: {
    //                 ids: [edit?.id],
    //                 action: 'active'
    //             }
    //         })
    //     }
    // }, [result.isSuccess])

    // useEffect(() => {
    //     if (couponResult.isSuccess) {
    //         response(edit?.coupon_code)
    //         closeModal()
    //     }
    // }, [couponResult?.isSuccess])

    return (
        <>

            <CenteredModal
                scrollControl={false}
                modalClass="modal-md"
                open={open}
                handleModal={closeModal}
                handleSave={handleSubmit(handleSave)}
                title="Import Item Description"
                loading={loading}

            >
                <div className="px-1">
                    <Row className='pt-1'>
                        <div className='text-center text-warning mb-1 text-bolder'>
                            {loadingSample ? (
                                <div className='loader-top me-2 '>
                                    <span className='spinner'>
                                        <Spinner color='primary' animation='border' size={'xl'}>
                                            <span className='visually-hidden'>Loading...</span>
                                        </Spinner>
                                    </span>
                                </div>
                            ) : (
                                <u onClick={sampleBooking} style={{ cursor: 'pointer' }}>
                                    {FM('download-sample-file')}{' '}
                                </u>
                            )}
                        </div>
                    </Row>
                    <Row className="gy-1">
                        <Col md='12'>
                            <FormGroupCustom
                                label={FM('work-package')}
                                name={'work_pack_id'}
                                type={'select'}
                                className='mb-0'
                                path={ApiEndpoints.list_work_package}
                                selectLabel='name'
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
                                    required: true
                                }}
                            />
                        </Col>

                        <Col md="12">
                            <FormGroupCustom
                                label={`${FM('upload-excel-file')}`}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                name="file"
                                type="file"
                                className="mb-0"
                                errorMessage="Please select only .xlsx, .xls or .csv file"
                                control={control}
                                rules={{ required: true }}
                            />
                        </Col>
                    </Row>
                </div>
            </CenteredModal>

        </>
    )
}
