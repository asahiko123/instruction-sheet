<template>
    <div class="navigation-bar">
        <!-- Image and text -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/main">
                <i class="fa-light fa-file-invoice"></i>
                お手軽マニュアルメーカー
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/main"><i class="fas fa-file-alt"></i>メインページ</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            <i class="fas fa-user-graduate"></i>
                            テンプレート作成
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">テンプレート１</a></li>
                            <li><a class="dropdown-item" href="#">テンプレート２</a></li>
                            <li><a class="dropdown-item" href="#">テンプレート３</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .navigation-bar{
        height: 60px;
    }
</style>