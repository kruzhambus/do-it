<template>
    <div class="sidebar">
        <div class="sidebar-items">
            <div class="items">
                <img src="/sidebar/001-knight.png" alt="" srcset="">
            </div>
            <div class="items">
                <img src="/sidebar/002-trophy.png" alt="" srcset="">
            </div>
            <div class="items">
                <img src="/sidebar/004-growth.png" alt="" srcset="">
            </div>
            <div class="items">
                <img src="/sidebar/003-network.png" alt="" srcset="">
            </div>
            <div class="items">
                <img src="/sidebar/006-target.png" alt="" srcset="">
            </div>
            <div class="items">
                <img src="/sidebar/005-megaphone.png" alt="" srcset="">
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
    display: flex;
    width: 114px;
    flex-direction: column;
    height: 100vh;
    border-right: 1px solid #20252B;
}
.sidebar-items {
    margin-top: 149px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.items {
    margin-top: 80px;
}
img {
    width: 32px;
    height: 32px;
}
@media screen  and (max-width: 1100px) {
    .sidebar {
        width: 60px;
    }
}
@media screen  and (max-width: 850px) {
    .sidebar {
        width: 100%;
        bottom: 0;
        display: block;
        height: min-content;
        top: unset;
        border-right: none;
        border-top: 1px solid #20252B;
    }

    .sidebar-items {
        margin: 16px 0;
        flex-direction: row;
        justify-content: space-around;
    }
    .items {
        margin-top: 0;
    }
}
@media screen and (max-width: 400px) {
    .items img {
        width: 22px;
        height: 22px;
    }
}
* {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    font-size: 20px;
    color: #F5F5F5;
  }
</style>