import { graphql } from "./graphql";

const CLAIM_DETAIL_FOR_TAT_FRAGMENT = graphql(`
  fragment ClaimDetailForTat on claim_cases {
    tat_in_seconds
    action_logs(order_by: { created_at: desc }) {
      old_value
      new_value
      created_at
    }
    created_at
    status
    is_direct_billing
    claim_documents(order_by: { created_at: desc }) {
      created_at
      type
      claim_document_type {
        value
      }
    }
    insured_certificate {
      policy {
        insurer_company {
          company_id
        }
      }
    }
  }
`);

const CLAIM_ICON_FRAGMENT = graphql(`
  fragment ClaimIcons on claim_cases {
    id: claim_case_id
    code
    is_direct_billing
    is_accessible
    is_jet
    stp_status
    claim_source {
      value
      comment
    }
    labels {
      label {
        id
        name
        description
        color
      }
    }
    insured_certificate {
      policy {
        insurer_company {
          company_id
        }
        policy_setting {
          turn_around_time_commitment
        }
      }
      insured_person {
        id: insured_person_id
        labels {
          label {
            id
            name
            description
            color
          }
        }
      }
    }
    source_emails {
      email_id
    }
  }
`);

// prettier-ignore
const CLAIM_HISTORY_FRAGMENT = graphql(`
  fragment HistoryClaimCase on claim_cases {
    claim_case_id
    id: claim_case_id
    code
    start_date
    admission_date
    discharge_date
    event_date
    physical_examination_date
    diagnosis
    amount
    is_direct_billing
    is_jet
    status
    benefit_type
    created_at
    source
    challenge_abuse
    is_accessible
    stp_status
    ...ClaimDetailForTat
    ...ClaimIcons
    claim_source {
      value
      comment
    }
    medical_provider {
      id: medical_provider_id
      name
    }
    insured_benefit_type {
      comment
      value
    }
    claim_case_status {
      comment
      value
    }
    insured_certificate {
      policy {
        policy_number
        issued_at
        dued_at
        insurer_company {
          company_id
        }
      }
    }
    claim_case_assessed_diagnoses(order_by: { order: asc_nulls_last }) {
      icd {
        id: metadata_id
        title
        value
      }
    }
    claim_case_payment {
      actual_paid_amount
      applied_premium_debt_amount
    }
    claim_case_details_aggregate {
      aggregate {
        sum {
          total_paid_amount
        }
      }
    }
  }
`, [CLAIM_DETAIL_FOR_TAT_FRAGMENT, CLAIM_ICON_FRAGMENT])

const CLAIM_CASE_ON_CLAIM_DETAIL_FRAGMENT = graphql(`
  fragment ClaimCaseOnGetClaimDetail on claim_cases {
    claim_case_id
    id: claim_case_id
    code
    claim_number
    tat_in_seconds
    admission_date
    start_date
    discharge_date
    event_date
    physical_examination_date
    start_date
    insurance_event
    medical_provider_id
    medical_provider_name
    medical_provider {
      name
    }
    treatment_method
    request_amount
    diseases
    status
    diagnosis
    benefit_type
    insured_certificate_id
    insured_person_id
    bank_id
    payment_account_name
    payment_account_number
    assessed_plan_balance_id
    doctor_name
    waiting_remarks
    stp_status
    jsonb_copay_mechanism_result
    insured_certificate {
      certificate_code
      phone
      email
      endorsement_code
      endorsement_reason
      endorsement_reason_type {
        comment
      }
      insured_certificate_related_events {
        ...CertificateRelatedEvent
      }
      insured_certificate_underwriting_notes {
        note
      }
      policy {
        id: policy_id
        issued_at
        dued_at
        policy_terms_aggregate {
          aggregate {
            count
          }
        }
        insurer_company {
          company_setting {
            use_claim_benefit_v2
          }
        }
        corporate_company {
          name
        }
        phone
        email
      }
      plan {
        computed_policy_terms(limit: 1) {
          id
        }
        policy_terms_aggregate {
          aggregate {
            count
          }
        }
      }
      insured_certificate_agents(order_by: { created_at: desc }) {
        type
        agent {
          id
          email
          phone
          name
          code
          watch_by {
            insurer_id
            id
          }
        }
      }
    }
    claim_case_beneficiary {
      id
      bank_id
      bank_account_number
      beneficiary_name
      premium_policy_number
      paper_id
      payment_method
      updated_at
      warning_code
      confirmed_at
      confirmed_by_user {
        name
      }
    }
    insured_person {
      id: insured_person_id
      vip_level
      name
      paper_id
    }
    insured_benefit_type {
      comment
      value
    }
    claim_case_status {
      comment
      value
    }
    created_at
    updated_at
    is_direct_billing
    source
    claim_source {
      value
      comment
    }
    claim_case_assessed_diagnoses(order_by: { order: asc_nulls_last }) {
      icd {
        id: metadata_id
        title
        value
      }
    }

    claim_case_input_diagnoses {
      icd {
        id: metadata_id
        title
        value
      }
    }
    claim_case_payment {
      actual_paid_amount
      applied_premium_debt_amount
      is_partial_paid
      shortfall_amount
    }
    claim_case_details {
      total_paid_amount
    }
    is_jet
    is_accessible
    is_stp
    challenge_abuse
    original_claim_case {
      ...OriginalClaimCaseOnGetClaimCaseDetail
    }
    created_by_user {
      id: user_id
      name
    }
    meta_v2 {
      assessor {
        id: user_id
        name
        avatar_url
      }
    }
    genesis_claim_case {
      id: claim_case_id
      code
    }
    correspondence_emails {
      email: string_value
    }
    source_emails {
      email_id
    }
  }
`);

// prettier-ignore
const CLAIM_NOTES_ON_GET_CLAIM_DETAIL_FRAGMENT = graphql(`
  fragment ClaimNotesOnGetClaimDetail on claim_notes {
    id
    content
    created_at
    type
    user_id
    user {
      name
      avatar_url
      roles {
        role
      }
    }
    share_to_insurer
  }
`);

// prettier-ignore
const FRAGMENTS = graphql(`
  fragment InsuredBenefitOnClaimDetail on insured_benefits {
    id
    code
    name
    type
    insured_benefit_type {
      value
      comment
    }
  }

  fragment PlanInsuredBenefitOnClaimDetail on plan_insured_benefits {
    id
    is_direct_billing
    apply_copay
    insured_benefit_id
    insured_benefit {
      ...InsuredBenefitOnClaimDetail
    }
    plan_balance_benefits {
      id
      plan_balance_id
      plan_balance {
        name
      }
    }
  }

  fragment ClaimPendingCodesOnGetClaimDetail on claim_pending_codes {
    id: claim_pending_code_id
    code
    status
    extended_text
    started_at
    removed_at
    created_at
    updated_at
    pending_code {
      document_type
      description
      internal
    }
    fwd_pending_code {
      ppy_pending_code
      code
    }
    claim_pending_code_documents {
      claim_document_id
      type
      created_at
      file {
        file_id
        name
        url
      }
    }
  }


  fragment ClaimCaseDetailsOnGetClaimDetail on claim_case_details {
    claim_case_detail_id
    request_amount
    request_time
    paid_time
    paid_amount
    total_paid_amount
    total_request_amount
    total_paid_amount_before_copay
    non_paid_amount
    note
    updated_at
    plan_insured_benefit {
      ...PlanInsuredBenefitOnClaimDetail
    }
    plan_balance_claim_case_details {
      plan_balance {
        id
        name
        value
        balanceRemain: value
        balanceUsed: value
        plan_balance_benefits {
          id
        }
        plan_balance_type {
          comment
        }
      }
    }
  }

  fragment PolicyWaitingTimesOnClaimDetail on policy_waiting_times {
    value
    description
    insured_benefit_types
  }

  fragment PlanRemarkOnGetClaimDetail on plan_remarks {
    id
    description
    created_at
    plan_id
  }

  fragment InsuredPersonRemarksOnGetClaimDetail on insured_person_remarks {
    id
    description
    insured_person_remark_benefit_type {
      comment
    }
    created_at
  }

  fragment CertificateRelatedEvent on insured_certificate_related_events {
    event_type
    old_value
    new_value
    effective_date
  }

  fragment OriginalClaimCaseOnGetClaimCaseDetail on original_claim_cases {
    id
    claim_case_beneficiary {
      id
      bank_id
      bank_account_number
      beneficiary_name
      premium_policy_number
      paper_id
      payment_method
    }
    admission_date
    discharge_date
    physical_examination_date
    event_date
    is_jet
    medical_provider_name
    medical_provider {
      name
      medical_provider_id
    }
    fwd_original_claim_case {
      policy_note
      exclusion_info
      related_to_accident
    }
  }

  fragment InsuredPersonClaimCasesHistory on insured_persons {
    claim_cases(where: { claim_case_id: { _neq: $claimId } }, order_by: { start_date: desc }) {
      ...HistoryClaimCase
    }
    claim_cases_aggregate(where: { claim_case_id: { _neq: $claimId } }) {
      aggregate {
        count
      }
    }
  }

  fragment InsuredPersonOnGetClaimDetail on insured_persons {
    id: insured_person_id
    name
    phone
    insured_person_id
    vip_level
    email
    insured_number
    paper_id
    paper_issued_place
    paper_issued_at
    dob
    died_at
    age
    gender
    marital_status
    subsidiary_company_name
    mbal_insured_person {
      job
      occupation_class
    }
    individual_policies {
      policy_number
    }
    insured_relationship_tos {
      type
      insured_person_to_id
      insured_relationship_type {
        comment
      }
    }
    watch_by {
      insurer_id
      id
    }
  }
  fragment MetaReferenceOnGetClaimDetail on meta_references {
    string_value
    meta_reference {
      string_value
    }
  }

  fragment PolicyCorrespondenceOnClaimDetail on policy_correspondences {
    id
    auto_send
    send_when
    conditions
    template {
      id
      name
      description
      medium
      send_when
      created_at
      template_by_locales {
        id
        subject
        content
        locale
        type
      }
    }
    histories(where: { claim_case_id: { _eq: $claimId } }, order_by: { created_at: asc }) {
      id
      created_at
      destination
      content
      status
      claim_case_id
      auto_send
      user_id
      actor {
        user_id
        name
        email
      }
    }
  }

  fragment PolicySettingOnClaimDetail on policy_settings {
    use_sms
    turn_around_time_commitment
    correspondence_from_email
    blacklist_medial_provider_group_histories {
      medical_provider_group {
        type
      }
      medical_provider_group_medical_providers(where: {}) {
        medical_provider {
          id: medical_provider_id
        }
      }
    }
    medical_provider_group_applications {
      medical_provider_group_version {
        medical_provider_group_medical_providers {
          medical_provider {
            id: medical_provider_id
            name
          }
        }
        medical_provider_group {
          type
          medical_provider_group_type {
            comment
          }
        }
      }
    }
    blacklist_drug_store_tax_codes
    hr_emails(where: { object_key: { _is_null: true } }) {
      ...MetaReferenceOnGetClaimDetail
    }
    broker_emails(where: { object_key: { _is_null: true } }) {
      ...MetaReferenceOnGetClaimDetail
    }
    present_case_emails(where: { object_key: { _is_null: true } }) {
      ...MetaReferenceOnGetClaimDetail
    }
    bcc_emails(where: { object_key: { _is_null: true } }) {
      ...MetaReferenceOnGetClaimDetail
    }
    insurer_emails(where: { object_key: { _is_null: true } }) {
      ...MetaReferenceOnGetClaimDetail
    }
    policy_correspondences @include(if: $withCorrespondences) {
      ...PolicyCorrespondenceOnClaimDetail
    }
    co_payment_type
    policy_co_payment_type {
      comment
    }
    apply_static_claim_case_payment
    assessment_remarks
    claim_form_type
  }

  fragment ClaimDocumentOnGetClaimDetail on claim_documents {
    id: claim_document_id
    created_at
    source
    type
    newest_ocr_paper {
      prescription {
        icd_codes
        medical_provider_name
        diagnoses
      }
    }
    ocr_claim_document_type {
      value
      comment
    }
    claim_document_type {
      value
      comment
    }
    uploader {
      name
    }
    file {
      id: file_id
      url
      mime_type
      original_file {
        id: file_id
        url
        claim_document {
          id: claim_document_id
        }
      }
      page_number
      has_ocr_raw_data
    }
  }

  fragment ClaimActionLog on audit_logs_record_status_changes {
    created_at
    old_value
    new_value
    user {
      id: user_id
      name
      user_credentials {
        email
      }
    }
  }

  fragment PlanBalancesOfClaimCase on plan_balances {
    id
    name
    value
    balanceRemain: value
    balanceUsed: value
    plan_balance_benefits {
      plan_insured_benefit {
        insured_benefit {
          type
        }
      }
      id
    }
    plan_balance_type {
      comment
    }
  }

  fragment SyncLog on fwd_sync_logs {
    data
    type
    direction
    created_at
    is_success
    user {
      user_id
      name
    }
  }

  fragment CompanyCorrespondenceOnClaimDetail on company_correspondences {
    id
    send_when
    auto_send
    conditions
    template {
      id
      name
      description
      medium
      send_when
      created_at
      template_by_locales {
        id
        subject
        content
        locale
        type
      }
    }
    histories(where: { claim_case_id: { _eq: $claimId } }, order_by: { created_at: asc }) {
      id
      created_at
      destination
      content
      status
      claim_case_id
      auto_send
      user_id
      actor {
        user_id
        name
        email
      }
    }
  }

  fragment FromInsuredCertificate on insured_certificates {
    id: insured_certificate_id
    issued_at
    dued_at
    policy_plan {
      plan_id
      plan_name
      policy {
        policy_id
        policy_number
        corporate_company {
          name
        }
        insurer_company {
          name
        }
      }
    }
  }

  fragment ClaimCaseDetailFull on claim_cases {
    ...ClaimCaseOnGetClaimDetail
    ...ClaimIcons
    insured_certificate {
      id: insured_certificate_id
      insured_certificate_id
      issued_at
      dued_at
      effective_date
      lapsed_date
      reinstated_date
      settle_date
      expiry_date
      sum_assured
      insured_person_id
      status
      plan_id
      parent_insured_certificate {
        insured_certificate_id
        insured_person {
          insured_person_id
          name
          email
        }
      }
      ...ClaimCasesHistory
      from_insured_certificate_courses {
        from_insured_certificate {
          ...ClaimCasesHistory
        }
      }
      insured_person {
        ...InsuredPersonOnGetClaimDetail
        ...InsuredPersonClaimCasesHistory
      }
      policy {
        id: policy_id
        policy_id
        remark_copay
        effective_date
        lapsed_date
        reinstated_date
        expiry_date
        status
        policy_number
        types
        tpa_id
        policy_documents {
          file {
            name
            url
          }
        }
        insurer {
          company_id
          name
        }
        insurer_company {
          company_id
          company_setting {
            correspondence_from_email
            correspondence_api_type
            use_claim_benefit_v2
            company_correspondences @include(if: $withCorrespondences) {
              ...CompanyCorrespondenceOnClaimDetail
            }
            bank_account
          }
        }
        policy_waiting_times {
          ...PolicyWaitingTimesOnClaimDetail
        }
        corporate_company {
          company_id
          name
          tax_code
          email
          phone
        }
        policy_setting {
          ...PolicySettingOnClaimDetail
        }
        insured_person {
          gender
          name
          email
          phone
          dob
          died_at
          paper_id
          insured_person_id
          mbal_insured_person {
            job
            occupation_class
          }
        }
        sum_assured
        watch_by {
          insurer_id
          id
        }
      }
      policy_plan {
        plan_name
        plan_code
        plan_id
        plan {
          plan_balances(where: { allow_assessment: { _eq: true } }) {
            ...PlanBalancesOfClaimCase
          }
        }
      }
      ...FromInsuredCertificate
      from_insured_certificate_courses {
        ordinal_number
        from_insured_certificate {
          ...FromInsuredCertificate
          from_insured_certificate_courses {
            ordinal_number
            from_insured_certificate {
              ...FromInsuredCertificate
            }
          }
        }
      }
      mbal_insured_certificate_beneficiaries(limit: 1, order_by: { created_at: desc }) {
        bank_account
        bank_code
        bank_name
        beneficiary_name
      }
    }
    agent {
      id
      email
      phone
      name
      code
      watch_by {
        insurer_id
        id
      }
    }
    fwd_claim_case {
      decline_code_value
      decline_description
      policy_note
      exclusion_info
      related_to_accident
    }
    mbal_claim_case {
      id: claim_case_id
      disease_group_id
      is_fatca_us_citizen
      is_fatca_us_related
      is_fatca_us_tax_payer
    }
    slv_claim_case {
      related_to_accident
      disease_group_id
    }

    insured_person {
      ...InsuredPersonOnGetClaimDetail
      ...InsuredPersonClaimCasesHistory
      insured_person_remarks(order_by: { created_at: desc }) {
        ...InsuredPersonRemarksOnGetClaimDetail
      }
    }
    claim_pending_codes(order_by: { created_at: asc }) {
      ...ClaimPendingCodesOnGetClaimDetail
    }
    claim_notes(where: { type: { _in: [SignOff, PresentCaseNote, LaNote, MEDICAL_PROVIDER] } }, order_by: { created_at: asc }) {
      ...ClaimNotesOnGetClaimDetail
    }
    assessment_summary: claim_notes(where: { type: { _eq: ASSESSMENT_SUMMARY } }, order_by: { created_at: desc }, limit: 1) {
      ...ClaimNotesOnGetClaimDetail
    }
    assessment_explanation: claim_notes(where: { type: { _eq: ASSESSMENT_EXPLANATION } }, order_by: { created_at: desc }, limit: 1) {
      id
      content
    }
    claim_case_details {
      ...ClaimCaseDetailsOnGetClaimDetail
    }
    claim_documents(order_by: { created_at: desc }) {
      ...ClaimDocumentOnGetClaimDetail
    }
    claim_case_details_aggregate {
      aggregate {
        sum {
          total_paid_amount
          total_paid_amount_before_copay
        }
      }
    }
    medical_provider {
      medical_provider_id
      name
      email
      watch_by {
        insurer_id
        id
      }
      company_role {
        id: company_id
      }
      medical_provider_mappings {
        code
        company_id
        watch_by {
          insurer_id
          id
        }
      }
      aliases {
        id
        name
        normalized_name
      }
    }
    claim_treatment_info_item {
      room_fee
      num_of_in_hospital_days
      total_room_fee
      test_fee
      medicine_fee
      surgery_fee
      other_fee
      teeth_treatment_fee
      dental_tartar_removal_fee
      examination_fee
      time_in_hospital
      unit_of_time_in_hospital
    }
    action_logs(order_by: { created_at: desc }) {
      ...ClaimActionLog
    }
    presentCaseCorrespondenceHistories: correspondence_histories(
      where: {
        _or: [{ company_correspondence: { template: { send_when: { _eq: CLAIM_WAITING } } } }, { policy_correspondence: { template: { send_when: { _eq: CLAIM_WAITING } } } }]
      }
    ) {
      id
      status
      destination
      subject
      message
      content
      created_at
      company_correspondence {
        id
        template {
          medium
        }
      }
      policy_correspondence {
        id
        template {
          medium
        }
      }
    }
    grace_period_start_date
    grace_period_end_date
    updated_at
    updated_by_user {
      name
    }
    claim_date_ranges @include(if: $withRemoteSchema) {
      ranges {
        ...dateRangeForClaim
      }
    }
    claim_case_payment {
      id: claim_case_id
      requested_amount
      estimated_paid_amount
      actual_paid_amount
      initial_premium_debt_amount
      applied_premium_debt_amount
      remaining_premium_debt_amount
      co_payment_ratio
      co_payment_amount
      deductible_amount
      coverage_amount
      non_paid_amount
      custom_amount
      custom_amount_reason
      shortfall_amount
    }
    claim_case_decline_histories(limit: 1, order_by: { created_at: desc }) {
      id
      decline_code
      decline_description
      deleted_at
      deleted_reason
    }
    claim_case_group_claim_cases {
      id
      type
      claim_case {
        id: claim_case_id
        code
      }
      claim_case_group {
        id
        type
        claim_case_group_type {
          comment
        }
        claim_case_group_claim_cases(where: { claim_case: {} }) {
          id
          claim_case_group_claim_case_type {
            value
            comment
          }
          claim_case {
            claim_case_id
            id: claim_case_id
            benefit_type
            code
            is_direct_billing
            status
            event_date
            physical_examination_date
            admission_date
            discharge_date
            created_at
            insured_certificate_id
            insured_person {
              name
            }
            insured_benefit_type {
              value
              comment
            }
            claim_case_status {
              value
              comment
            }
            claim_case_group_claim_cases {
              claim_case_group_claim_case_type {
                value
                comment
              }
            }
          }
        }
      }
    }
    pti_claim_case {
      benefit_type
      disease_group
    }
    labels {
      label {
        id
        name
        description
        color
      }
    }
    ...ClaimDetailForTat
    claim_case_beneficiary {
      payment_method
    }
    claim_case_same_event_groups_claim_case {
      id
      claim_case_group_id
      claim_case_same_event_group {
        id
        code
        claim_case_same_event_groups_claim_cases {
          claim_case {
            grace_period_start_date
            code
            status
            claim_pending_codes {
              code
              status
              pending_code {
                internal
              }
            }
          }
        }
        slv_claim_case_same_event_group {
          ...slvClaimCaseGroup
        }
      }
    }
  }

  fragment slvClaimCaseGroup on slv_claim_case_same_event_groups {
    group_status {
      value
      comment
    }
    case_reason_investigator_type {
      comment
      value
    }
    case_reason_re_uw_type {
      value
      comment
    }
    has_surgery_doc
    hospital_department
    hospital_department_type
    hospital_stamp
    mrn
    patient_id
    treatment_methods
    claimant_name
    claimant_phone
  }

  fragment dateRangeForClaim on ClaimDateRange {
    id: key
    key
    certificateHistoryId
    planId
    startDate
    endDate
    sumAssured
    gracePeriodStartDate
    policy_plan {
      plan_name
    }
    plan {
      plan_id
      code
      copay_mechanism
      plan_balances(where: { allow_assessment: { _eq: true } }) {
        ...PlanBalancesOfClaimCase
      }
      plan_remarks(order_by: { created_at: desc }) {
        ...PlanRemarkOnGetClaimDetail
      }
    }
  }
`, [CLAIM_NOTES_ON_GET_CLAIM_DETAIL_FRAGMENT, CLAIM_CASE_ON_CLAIM_DETAIL_FRAGMENT]);

// prettier-ignore
const CLAIM_CASE_HISTORY_ON_INSURED_CERTIFICATE = graphql(`
    fragment ClaimCasesHistory on insured_certificates {
      claim_cases(where: { claim_case_id: { _neq: $claimId } }, order_by: { start_date: desc }) {
        ...HistoryClaimCase
      }
      claim_cases_aggregate(where: { claim_case_id: { _neq: $claimId } }) {
        aggregate {
          count
        }
      }
    }
  `,
  [CLAIM_HISTORY_FRAGMENT],
);

// prettier-ignore
const CLAIM_DETAIL_QUERY = graphql(`
    query getClaimDetail($claimId: uuid!, $withCorrespondences: Boolean = false, $withRemoteSchema: Boolean = true) {
      claim_cases_by_pk(claim_case_id: $claimId) {
        ...ClaimCaseDetailFull
      }
    }
  `,
  [CLAIM_HISTORY_FRAGMENT, CLAIM_ICON_FRAGMENT, FRAGMENTS, CLAIM_CASE_HISTORY_ON_INSURED_CERTIFICATE],
);

// prettier-ignore
const CLAIM_DETAIL_QUERY2 = graphql(`
    query getClaimDetail($claimId: uuid!, $withRemoteSchema: Boolean = true) {
      claim_cases_by_pk(claim_case_id: $claimId) {
        insured_certificate {
          id: insured_certificate_id
        }
        agent {
          id
          email
          phone
          name
          code
          watch_by {
            insurer_id
            id
          }
        }
        fwd_claim_case {
          decline_code_value
          decline_description
          policy_note
          exclusion_info
          related_to_accident
        }
        mbal_claim_case {
          id: claim_case_id
          disease_group_id
          is_fatca_us_citizen
          is_fatca_us_related
          is_fatca_us_tax_payer
        }
        slv_claim_case {
          related_to_accident
          disease_group_id
        }

        insured_person {
          ...InsuredPersonOnGetClaimDetail
          ...InsuredPersonClaimCasesHistory
          insured_person_remarks(order_by: { created_at: desc }) {
            ...InsuredPersonRemarksOnGetClaimDetail
          }
        }
        claim_pending_codes(order_by: { created_at: asc }) {
          ...ClaimPendingCodesOnGetClaimDetail
        }
        claim_notes(where: { type: { _in: [SignOff, PresentCaseNote, LaNote, MEDICAL_PROVIDER] } }, order_by: { created_at: asc }) {
          ...ClaimNotesOnGetClaimDetail
        }
        assessment_summary: claim_notes(where: { type: { _eq: ASSESSMENT_SUMMARY } }, order_by: { created_at: desc }, limit: 1) {
          ...ClaimNotesOnGetClaimDetail
        }
        assessment_explanation: claim_notes(where: { type: { _eq: ASSESSMENT_EXPLANATION } }, order_by: { created_at: desc }, limit: 1) {
          id
          content
        }
        claim_case_details {
          ...ClaimCaseDetailsOnGetClaimDetail
        }
        claim_documents(order_by: { created_at: desc }) {
          ...ClaimDocumentOnGetClaimDetail
        }
        claim_case_details_aggregate {
          aggregate {
            sum {
              total_paid_amount
              total_paid_amount_before_copay
            }
          }
        }
        medical_provider {
          medical_provider_id
          name
          email
          watch_by {
            insurer_id
            id
          }
          company_role {
            id: company_id
          }
          medical_provider_mappings {
            code
            company_id
            watch_by {
              insurer_id
              id
            }
          }
          aliases {
            id
            name
            normalized_name
          }
        }
        claim_treatment_info_item {
          room_fee
          num_of_in_hospital_days
          total_room_fee
          test_fee
          medicine_fee
          surgery_fee
          other_fee
          teeth_treatment_fee
          dental_tartar_removal_fee
          examination_fee
          time_in_hospital
          unit_of_time_in_hospital
        }
        action_logs(order_by: { created_at: desc }) {
          ...ClaimActionLog
        }
        presentCaseCorrespondenceHistories: correspondence_histories(
          where: {
            _or: [{ company_correspondence: { template: { send_when: { _eq: CLAIM_WAITING } } } }, { policy_correspondence: { template: { send_when: { _eq: CLAIM_WAITING } } } }]
          }
        ) {
          id
          status
          destination
          subject
          message
          content
          created_at
          company_correspondence {
            id
            template {
              medium
            }
          }
          policy_correspondence {
            id
            template {
              medium
            }
          }
        }
        grace_period_start_date
        grace_period_end_date
        updated_at
        updated_by_user {
          name
        }
        claim_date_ranges @include(if: $withRemoteSchema) {
          ranges {
            ...dateRangeForClaim
          }
        }
        claim_case_payment {
          id: claim_case_id
          requested_amount
          estimated_paid_amount
          actual_paid_amount
          initial_premium_debt_amount
          applied_premium_debt_amount
          remaining_premium_debt_amount
          co_payment_ratio
          co_payment_amount
          deductible_amount
          coverage_amount
          non_paid_amount
          custom_amount
          custom_amount_reason
          shortfall_amount
        }
        claim_case_decline_histories(limit: 1, order_by: { created_at: desc }) {
          id
          decline_code
          decline_description
          deleted_at
          deleted_reason
        }
        claim_case_group_claim_cases {
          id
          type
          claim_case {
            id: claim_case_id
            code
          }
          claim_case_group {
            id
            type
            claim_case_group_type {
              comment
            }
            claim_case_group_claim_cases(where: { claim_case: {} }) {
              id
              claim_case_group_claim_case_type {
                value
                comment
              }
              claim_case {
                claim_case_id
                id: claim_case_id
                benefit_type
                code
                is_direct_billing
                status
                event_date
                physical_examination_date
                admission_date
                discharge_date
                created_at
                insured_certificate_id
                insured_person {
                  name
                }
                insured_benefit_type {
                  value
                  comment
                }
                claim_case_status {
                  value
                  comment
                }
                claim_case_group_claim_cases {
                  claim_case_group_claim_case_type {
                    value
                    comment
                  }
                }
              }
            }
          }
        }
        pti_claim_case {
          benefit_type
          disease_group
        }
        labels {
          label {
            id
            name
            description
            color
          }
        }
        ...ClaimDetailForTat
        claim_case_beneficiary {
          payment_method
        }
        claim_case_same_event_groups_claim_case {
          id
          claim_case_group_id
          claim_case_same_event_group {
            id
            code
            claim_case_same_event_groups_claim_cases {
              claim_case {
                grace_period_start_date
                code
                status
                claim_pending_codes {
                  code
                  status
                  pending_code {
                    internal
                  }
                }
              }
            }
            slv_claim_case_same_event_group {
              ...slvClaimCaseGroup
            }
          }
        }
      }
    }
  `,
  [
    CLAIM_HISTORY_FRAGMENT,
    CLAIM_ICON_FRAGMENT,
    FRAGMENTS,
    CLAIM_CASE_HISTORY_ON_INSURED_CERTIFICATE,
  ],
);

// prettier-ignore
const CLAIM_DETAIL_QUERY3 = graphql(`
    query getClaimDetail($claimId: uuid!) {
      claim_cases_by_pk(claim_case_id: $claimId) {
        insured_certificate {
          id: insured_certificate_id
        }
      }
    }
  `,
  [
    CLAIM_HISTORY_FRAGMENT,
    CLAIM_ICON_FRAGMENT,
    FRAGMENTS,
    CLAIM_CASE_HISTORY_ON_INSURED_CERTIFICATE,
  ],
);

export {
  CLAIM_DETAIL_QUERY,
  CLAIM_HISTORY_FRAGMENT,
  CLAIM_NOTES_ON_GET_CLAIM_DETAIL_FRAGMENT,
};
