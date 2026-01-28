// Mock data based on DataSchema.js
export const mockData = {
  // Current user and context
  currentUser: {
    userId: 'user-001',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    groupId: 'group-001',
    roleId: 'role-admin',
    isActive: true
  },

  // Organizations/Groups
  groups: [
    {
      groupId: 'group-001',
      groupNumber: '1411',
      name: 'ABC Manufacturing Company',
      city: 'Seattle',
      state: 'WA',
      phone: '(206) 555-0100',
      supportPhone: '1-800-555-0199',
      isSuspended: false,
      isUbg401kPlan: true,
      status: 'Active'
    },
    {
      groupId: 'group-002',
      groupNumber: '1412',
      name: 'XYZ Construction Inc',
      city: 'Portland',
      state: 'OR',
      phone: '(503) 555-0200',
      supportPhone: '1-800-555-0199',
      isSuspended: false,
      isUbg401kPlan: false,
      status: 'Active'
    },
    {
      groupId: 'group-003',
      groupNumber: '1413',
      name: 'Acme Logistics',
      city: 'Tacoma',
      state: 'WA',
      phone: '(253) 555-0300',
      supportPhone: '1-800-555-0199',
      isSuspended: true,
      isUbg401kPlan: true,
      status: 'Active'
    }
  ],

  // Roles and permissions
  roles: [
    { roleId: 'role-admin', roleName: 'System Admin', description: 'Full system access', isSystemRole: true },
    { roleId: 'role-employer', roleName: 'Employer User', description: 'Standard employer access', isSystemRole: false },
    { roleId: 'role-readonly', roleName: 'Read-Only User', description: 'View only access', isSystemRole: false }
  ],

  rolePermissions: {
    'role-admin': {
      Home: 'Edit',
      Payroll: 'Edit',
      Employee: 'Edit',
      Accrual: 'Edit',
      Admin: 'Edit',
      Credit: 'Edit',
      Reports: 'Edit',
      Employer: 'Edit',
      AccountStatements: 'Edit',
      SharedDocuments: 'Edit'
    },
    'role-employer': {
      Home: 'View',
      Payroll: 'Edit',
      Employee: 'Edit',
      Accrual: 'View',
      Admin: 'Invisible',
      Credit: 'View',
      Reports: 'View',
      Employer: 'View',
      AccountStatements: 'View',
      SharedDocuments: 'Edit'
    },
    'role-readonly': {
      Home: 'View',
      Payroll: 'View',
      Employee: 'View',
      Accrual: 'View',
      Admin: 'Invisible',
      Credit: 'View',
      Reports: 'View',
      Employer: 'View',
      AccountStatements: 'View',
      SharedDocuments: 'View'
    }
  },

  // Reminders
  reminders: [
    {
      reminderId: 'rem-001',
      groupId: 'group-001',
      type: 'LatePayroll',
      severity: 'Critical',
      title: 'Late Payroll Submission',
      message: 'Payroll for period ending 12/31/2025 is overdue',
      relatedEntityType: 'PayrollSubmission',
      relatedEntityId: 'payroll-003',
      createdAt: '2026-01-15T08:00:00Z',
      isDismissed: false
    },
    {
      reminderId: 'rem-002',
      groupId: 'group-001',
      type: 'PendingApproval',
      severity: 'Warning',
      title: 'Rates Pending Verification',
      message: 'Employee rates for 2026 require verification',
      relatedEntityType: 'EmployerRateVerification',
      relatedEntityId: 'verify-001',
      createdAt: '2026-01-10T10:30:00Z',
      isDismissed: false
    },
    {
      reminderId: 'rem-003',
      groupId: 'group-001',
      type: 'MissingEmployeeData',
      severity: 'Info',
      title: 'Missing Employee Information',
      message: '3 employees missing pay classification',
      relatedEntityType: 'Employee',
      relatedEntityId: null,
      createdAt: '2026-01-20T14:00:00Z',
      isDismissed: false
    }
  ],

  // Payroll submissions
  payrolls: [
    {
      payrollId: 'payroll-001',
      groupId: 'group-001',
      payrollType: 'Regular',
      processingStatus: 'Processed',
      status: 'Accepted',
      payCycle: 'Weekly',
      checkDate: '2026-01-10',
      payPeriodStartDate: '2026-01-01',
      payPeriodEndDate: '2026-01-07',
      inputMethod: 'FileUpload',
      submittedAt: '2026-01-08T15:30:00Z'
    },
    {
      payrollId: 'payroll-002',
      groupId: 'group-001',
      payrollType: 'Regular',
      processingStatus: 'Processed',
      status: 'Accepted',
      payCycle: 'Weekly',
      checkDate: '2026-01-17',
      payPeriodStartDate: '2026-01-08',
      payPeriodEndDate: '2026-01-14',
      inputMethod: 'ManualEntry',
      submittedAt: '2026-01-15T16:00:00Z'
    },
    {
      payrollId: 'payroll-003',
      groupId: 'group-001',
      payrollType: 'Regular',
      processingStatus: 'Unprocessed',
      status: 'Draft',
      payCycle: 'Weekly',
      checkDate: '2026-01-24',
      payPeriodStartDate: '2026-01-15',
      payPeriodEndDate: '2026-01-21',
      inputMethod: 'ManualEntry',
      submittedAt: null
    },
    {
      payrollId: 'payroll-004',
      groupId: 'group-001',
      payrollType: 'Adjustment',
      processingStatus: 'Unprocessed',
      status: 'NotStarted',
      payCycle: 'Weekly',
      checkDate: '2026-01-31',
      payPeriodStartDate: '2026-01-01',
      payPeriodEndDate: '2026-01-31',
      inputMethod: 'ManualEntry',
      submittedAt: null
    }
  ],

  // Employees
  employees: [
    {
      employeeId: 'emp-001',
      groupId: 'group-001',
      ssn: '***-**-1234',
      firstName: 'John',
      middleInitial: 'A',
      lastName: 'Smith',
      status: 'Active',
      payType: 'FullTime',
      payClass: 'H',
      isParticipant: true,
      hireDate: '2020-05-15',
      terminationDate: null
    },
    {
      employeeId: 'emp-002',
      groupId: 'group-001',
      ssn: '***-**-5678',
      firstName: 'Jane',
      middleInitial: 'B',
      lastName: 'Doe',
      status: 'Active',
      payType: 'PartTime',
      payClass: 'H',
      isParticipant: true,
      hireDate: '2021-03-10',
      terminationDate: null
    },
    {
      employeeId: 'emp-003',
      groupId: 'group-001',
      ssn: '***-**-9012',
      firstName: 'Bob',
      middleInitial: null,
      lastName: 'Johnson',
      status: 'Terminated',
      payType: 'Seasonal',
      payClass: 'S',
      isParticipant: false,
      hireDate: '2022-06-01',
      terminationDate: '2025-12-31'
    },
    {
      employeeId: 'emp-004',
      groupId: 'group-001',
      ssn: '***-**-3456',
      firstName: 'Alice',
      middleInitial: 'C',
      lastName: 'Williams',
      status: 'Active',
      payType: 'FullTime',
      payClass: 'H',
      isParticipant: true,
      hireDate: '2019-01-15',
      terminationDate: null
    },
    {
      employeeId: 'emp-005',
      groupId: 'group-001',
      ssn: '***-**-7890',
      firstName: 'Charlie',
      middleInitial: 'D',
      lastName: 'Brown',
      status: 'Active',
      payType: 'FullTime',
      payClass: 'H',
      isParticipant: true,
      hireDate: '2023-08-20',
      terminationDate: null
    }
  ],

  // Rate sets
  rateSets: [
    {
      rateSetId: 'rate-001',
      groupId: 'group-001',
      effectiveStartDate: '2026-01-01',
      effectiveEndDate: '2026-12-31',
      accrualRate: 0.0125,
      employeeRate: 0.0075,
      employerRate: 0.0050,
      adminRate: 0.0010,
      altEmployerRate: 0.0045
    }
  ],

  // Rate verifications
  rateVerifications: [
    {
      verificationId: 'verify-001',
      groupId: 'group-001',
      year: 2026,
      accrualRate: 0.0125,
      employeeRate: 0.0075,
      employerRate: 0.0050,
      altEmployerRate: 0.0045,
      status: 'Submitted',
      submittedOn: '2026-01-10T10:00:00Z',
      submittedByUserId: 'user-001',
      verifiedOn: null,
      verifiedByUserId: null
    }
  ],

  // Credit transactions
  creditTransactions: [
    {
      creditTransactionId: 'tx-001',
      groupId: 'group-001',
      transactionType: 'Deposit',
      amount: 5000.00,
      transactionDate: '2026-01-05',
      runningBalance: 5000.00,
      notes: 'Initial deposit'
    },
    {
      creditTransactionId: 'tx-002',
      groupId: 'group-001',
      transactionType: 'PayrollCharge',
      amount: -1250.00,
      transactionDate: '2026-01-10',
      runningBalance: 3750.00,
      referenceType: 'PayrollSubmission',
      referenceId: 'payroll-001',
      notes: 'Payroll processing fee'
    },
    {
      creditTransactionId: 'tx-003',
      groupId: 'group-001',
      transactionType: 'Deposit',
      amount: 2000.00,
      transactionDate: '2026-01-15',
      runningBalance: 5750.00,
      notes: 'Additional deposit'
    }
  ],

  // System parameters
  hceThresholds: [
    { year: 2024, amount: 150000 },
    { year: 2025, amount: 155000 },
    { year: 2026, amount: 160000 }
  ],

  salaryCaps: [
    { year: 2024, amount: 345000 },
    { year: 2025, amount: 350000 },
    { year: 2026, amount: 355000 }
  ],

  // Account statements
  accountStatements: [
    {
      statementId: 'stmt-001',
      groupId: 'group-001',
      statementDate: '2025-12-31',
      statementNumber: 'STMT-2025-Q4-001',
      status: 'Generated',
      generatedAt: '2026-01-05T00:00:00Z'
    },
    {
      statementId: 'stmt-002',
      groupId: 'group-001',
      statementDate: '2025-09-30',
      statementNumber: 'STMT-2025-Q3-001',
      status: 'Generated',
      generatedAt: '2025-10-05T00:00:00Z'
    }
  ],

  // Shared documents
  sharedDocuments: [
    {
      documentId: 'doc-001',
      groupId: 'group-001',
      fileName: 'Payroll_2025_Summary.xlsx',
      fileSizeBytes: 45678,
      uploadedAt: '2026-01-15T14:30:00Z',
      uploadedBy: 'John Doe',
      isDeleted: false
    },
    {
      documentId: 'doc-002',
      groupId: 'group-001',
      fileName: 'Employee_Benefits_Guide.pdf',
      fileSizeBytes: 1234567,
      uploadedAt: '2026-01-10T09:00:00Z',
      uploadedBy: 'Admin User',
      isDeleted: false
    }
  ],

  // Pay cycles
  payCycles: [
    {
      payCycleId: 'cycle-001',
      groupId: 'group-001',
      name: 'Standard Weekly',
      payFrequency: 'Weekly',
      startDate: '2026-01-01',
      isActive: true
    },
    {
      payCycleId: 'cycle-002',
      groupId: 'group-001',
      name: 'Bi-Weekly Salaried',
      payFrequency: 'BiWeekly',
      startDate: '2026-01-01',
      isActive: true
    }
  ],

  // Third party administrators
  tpas: [
    {
      tpaId: 'tpa-001',
      groupId: 'group-001',
      firstName: 'Sarah',
      lastName: 'Thompson',
      email: 'sarah.thompson@tpaservices.com',
      phone: '(206) 555-0400',
      status: 'Active'
    }
  ]
};

// Helper functions
export function getCurrentGroup() {
  return mockData.groups.find(g => g.groupId === mockData.currentUser.groupId);
}

export function getUserPermissions() {
  return mockData.rolePermissions[mockData.currentUser.roleId] || {};
}

export function hasTabAccess(tabKey) {
  const permissions = getUserPermissions();
  const level = permissions[tabKey];
  return level && level !== 'Invisible';
}

export function canEdit(tabKey) {
  const permissions = getUserPermissions();
  return permissions[tabKey] === 'Edit';
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US');
}

export function formatPercent(decimal) {
  return `${(decimal * 100).toFixed(2)}%`;
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
