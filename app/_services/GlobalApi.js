import dotenv from 'dotenv'
dotenv.config();
const { gql, default: request } = require("graphql-request")


const masterurl = 'https://ap-south-1.cdn.hygraph.com/content/cm3yyt9ju00r107upimfdznpg/master'



const getcategory = async () => {
  const query = gql`
    query Category {
  categories {
    id
    name
    icon {
      url
    }
  }
}`
  const result = await request(masterurl, query);
  return result
}

const getbussinessList = async () => {
  const query = gql`query BussinessList {
  businessLists {
    about
    address
    contactPerson
    email
    name
    id
    category {
      name
    }
    images {
      url
    }
  }
}`
  const result = await request(masterurl, query);
  return result;
}

const getbussinessListbycategory = async (category) => {

  const query = gql`
  query MyQuery {
  businessLists(where: {category:{name: "`+ category + `"}}) {
    about
    address
    contactPerson
    category {
      name
    }
    email
    id
    name
    images {
      url
    }
  }
}`
  const result = await request(masterurl, query);
  return result;
}





const createnewbooking = async (businessId, date, time, userEmail, userName) => {



  const mutationQuery = `
mutation CreateBooking {
  createBooking(
    data: {
      bookingStatus: booked, 
      businessList: { connect: { id: "${businessId}" } },
      date: "${date}", 
      time: "${time}", 
      userEmail: "${userEmail}",
      userName: "${userName}"
    }
  ) {
    id
  }
  publishManyBookings(to: PUBLISHED) {
    count
  }
}
`;
  const result = await request(masterurl, mutationQuery);
  return result;
};








const getbussinessByid = async (id) => {
  const query = gql`
  query getbussinessbyid {
  businessList(where: {id: "`+ id + `"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }`
  const result = await request(masterurl, query);
  return result;
}


const getbookeedslot = async (businessId, date) => {
  const query = `query BusinessBookedSlot {
      bookings(where: {businessList_some: 
      {id: "${businessId}"}, date: "${date}"}) {
      date
      time
    }
  }`;
  const result = await request(masterurl, query)
  return result;
}


const getbookingofuser = async (useremail) => {
  const query = gql`query MyQuery {
  bookings(where: {userEmail: "${useremail}"}  orderBy: publishedAt_DESC)
  {
    businessList {
      name
      images {
        url
      }
      address
      contactPerson
    }
    date
    time
  }
}`;
  const result = await request(masterurl, query);
  return result;
}

export default { createnewbooking, getbussinessByid, getcategory, getbussinessList, getbussinessListbycategory, getbookeedslot, getbookingofuser };