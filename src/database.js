// Database utility for Vishwkarma Library Management System
// Currently uses localStorage, can be upgraded to real database later

const DB_KEYS = {
  STUDENTS: 'library_students',
  SEAT_LAYOUT: 'library_seat_layout',
  PAYMENTS: 'library_payments',
  SETTINGS: 'library_settings'
};

// Initialize database with default data
export const initializeDatabase = () => {
  // Check if database is already initialized
  if (!localStorage.getItem(DB_KEYS.STUDENTS)) {
    // Initialize with sample data
    const initialStudents = [
      {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 9876543210",
        joinDate: "2024-01-15",
        feesPaid: true,
        planType: "full-time",
        feeAmount: 800,
        lastFeeDate: "2024-08-01",
        seatNumber: "15",
        status: "Active",
        studyHours: "9 AM - 9 PM",
        paymentHistory: [
          { id: 1, date: "2024-01-15", amount: 800, method: "Cash", status: "Paid", month: "Jan 2024" },
          { id: 2, date: "2024-02-15", amount: 800, method: "UPI", status: "Paid", month: "Feb 2024" },
          { id: 3, date: "2024-03-15", amount: 800, method: "Cash", status: "Paid", month: "Mar 2024" },
          { id: 4, date: "2024-04-15", amount: 800, method: "UPI", status: "Paid", month: "Apr 2024" },
          { id: 5, date: "2024-05-15", amount: 800, method: "Cash", status: "Paid", month: "May 2024" },
          { id: 6, date: "2024-06-15", amount: 800, method: "UPI", status: "Paid", month: "Jun 2024" },
          { id: 7, date: "2024-07-15", amount: 800, method: "Cash", status: "Paid", month: "Jul 2024" },
          { id: 8, date: "2024-08-01", amount: 800, method: "UPI", status: "Paid", month: "Aug 2024" }
        ],
        totalPaid: 6400,
        address: "123 Main St, Bhopal, MP"
      },
      {
        id: 2,
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+91 9876543211",
        joinDate: "2024-02-01",
        feesPaid: false,
        planType: "half-time",
        feeAmount: 500,
        lastFeeDate: "2024-07-01",
        seatNumber: "08",
        status: "Active",
        studyHours: "9 AM - 2 PM",
        paymentHistory: [
          { id: 1, date: "2024-02-01", amount: 500, method: "Cash", status: "Paid", month: "Feb 2024" },
          { id: 2, date: "2024-03-01", amount: 500, method: "UPI", status: "Paid", month: "Mar 2024" },
          { id: 3, date: "2024-04-01", amount: 500, method: "Cash", status: "Paid", month: "Apr 2024" },
          { id: 4, date: "2024-05-01", amount: 500, method: "UPI", status: "Paid", month: "May 2024" },
          { id: 5, date: "2024-06-01", amount: 500, method: "Cash", status: "Paid", month: "Jun 2024" },
          { id: 6, date: "2024-07-01", amount: 500, method: "UPI", status: "Paid", month: "Jul 2024" }
        ],
        totalPaid: 3000,
        address: "456 Park Road, Bhopal, MP"
      },
      {
        id: 3,
        name: "Amit Kumar",
        email: "amit@example.com",
        phone: "+91 9876543212",
        joinDate: "2024-02-10",
        feesPaid: true,
        planType: "full-time",
        feeAmount: 800,
        lastFeeDate: "2024-08-10",
        seatNumber: "22",
        status: "Active",
        studyHours: "9 AM - 9 PM",
        paymentHistory: [
          { id: 1, date: "2024-02-10", amount: 800, method: "UPI", status: "Paid", month: "Feb 2024" },
          { id: 2, date: "2024-03-10", amount: 800, method: "Cash", status: "Paid", month: "Mar 2024" },
          { id: 3, date: "2024-04-10", amount: 800, method: "UPI", status: "Paid", month: "Apr 2024" },
          { id: 4, date: "2024-05-10", amount: 800, method: "Cash", status: "Paid", month: "May 2024" },
          { id: 5, date: "2024-06-10", amount: 800, method: "UPI", status: "Paid", month: "Jun 2024" },
          { id: 6, date: "2024-07-10", amount: 800, method: "Cash", status: "Paid", month: "Jul 2024" },
          { id: 7, date: "2024-08-10", amount: 800, method: "UPI", status: "Paid", month: "Aug 2024" }
        ],
        totalPaid: 5600,
        address: "789 College St, Bhopal, MP"
      }
    ];

    const initialSeatLayout = {
      total: 80,
      occupied: ['15', '22', '08'],
      fullTimeSeats: ['15', '22'],
      halfTimeSeats: ['08']
    };

    localStorage.setItem(DB_KEYS.STUDENTS, JSON.stringify(initialStudents));
    localStorage.setItem(DB_KEYS.SEAT_LAYOUT, JSON.stringify(initialSeatLayout));
    
    console.log('Database initialized with sample data');
  }
};

// Student operations
export const getAllStudents = () => {
  try {
    const students = localStorage.getItem(DB_KEYS.STUDENTS);
    return students ? JSON.parse(students) : [];
  } catch (error) {
    console.error('Error loading students:', error);
    return [];
  }
};

export const saveStudents = (students) => {
  try {
    localStorage.setItem(DB_KEYS.STUDENTS, JSON.stringify(students));
    return true;
  } catch (error) {
    console.error('Error saving students:', error);
    return false;
  }
};

export const addStudent = (student) => {
  try {
    const students = getAllStudents();
    const newStudent = { ...student, id: Math.max(...students.map(s => s.id), 0) + 1 };
    students.push(newStudent);
    saveStudents(students);
    return newStudent;
  } catch (error) {
    console.error('Error adding student:', error);
    return null;
  }
};

export const updateStudent = (updatedStudent) => {
  try {
    const students = getAllStudents();
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      students[index] = updatedStudent;
      saveStudents(students);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating student:', error);
    return false;
  }
};

export const deleteStudent = (studentId) => {
  try {
    const students = getAllStudents();
    const filteredStudents = students.filter(s => s.id !== studentId);
    saveStudents(filteredStudents);
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    return false;
  }
};

// Seat layout operations
export const getSeatLayout = () => {
  try {
    const layout = localStorage.getItem(DB_KEYS.SEAT_LAYOUT);
    return layout ? JSON.parse(layout) : { total: 80, occupied: [], fullTimeSeats: [], halfTimeSeats: [] };
  } catch (error) {
    console.error('Error loading seat layout:', error);
    return { total: 80, occupied: [], fullTimeSeats: [], halfTimeSeats: [] };
  }
};

export const saveSeatLayout = (layout) => {
  try {
    localStorage.setItem(DB_KEYS.SEAT_LAYOUT, JSON.stringify(layout));
    return true;
  } catch (error) {
    console.error('Error saving seat layout:', error);
    return false;
  }
};

// Payment operations
export const addPayment = (studentId, payment) => {
  try {
    const students = getAllStudents();
    const student = students.find(s => s.id === studentId);
    if (student) {
      const newPayment = {
        ...payment,
        id: student.paymentHistory.length + 1,
        paymentId: payment.paymentId || Date.now(),
        notes: payment.notes || '',
        timestamp: new Date().toISOString()
      };
      
      student.paymentHistory.push(newPayment);
      student.totalPaid += payment.amount;
      student.feesPaid = true;
      student.lastFeeDate = payment.date;
      saveStudents(students);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding payment:', error);
    return false;
  }
};

// Backup and restore
export const exportData = () => {
  try {
    const data = {
      students: getAllStudents(),
      seatLayout: getSeatLayout(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    if (data.students && data.seatLayout) {
      localStorage.setItem(DB_KEYS.STUDENTS, JSON.stringify(data.students));
      localStorage.setItem(DB_KEYS.SEAT_LAYOUT, JSON.stringify(data.seatLayout));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Clear all data
export const clearDatabase = () => {
  try {
    localStorage.removeItem(DB_KEYS.STUDENTS);
    localStorage.removeItem(DB_KEYS.SEAT_LAYOUT);
    localStorage.removeItem(DB_KEYS.PAYMENTS);
    localStorage.removeItem(DB_KEYS.SETTINGS);
    return true;
  } catch (error) {
    console.error('Error clearing database:', error);
    return false;
  }
};

// Database statistics
export const getDatabaseStats = () => {
  try {
    const students = getAllStudents();
    const layout = getSeatLayout();
    
    // Calculate payment statistics
    const allPayments = students.flatMap(s => s.paymentHistory || []);
    const totalPayments = allPayments.length;
    const totalRevenue = students.reduce((sum, s) => sum + s.totalPaid, 0);
    
    // Monthly payment statistics
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const thisMonthPayments = allPayments.filter(p => p.month === currentMonth);
    const thisMonthRevenue = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0);
    
    return {
      totalStudents: students.length,
      activeStudents: students.filter(s => s.status === 'Active').length,
      totalSeats: layout.total,
      occupiedSeats: layout.occupied.length,
      availableSeats: layout.total - layout.occupied.length,
      totalRevenue,
      totalPayments,
      thisMonthRevenue,
      thisMonthPayments: thisMonthPayments.length,
      pendingFees: students.filter(s => !s.feesPaid).length
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
};
